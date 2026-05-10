# MobileWright on Windows — Complete Setup Guide

This guide covers everything needed to run MobileWright Android tests on Windows,
including two bug fixes required for the framework to work on Windows at all.

---

## Prerequisites

| Tool | Min Version | Download |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| Java JDK | 11+ | https://adoptium.net |
| Android Studio | Latest | https://developer.android.com/studio |
| Git | Any | https://git-scm.com |

---

## Step 1 — Set Up Android SDK

1. Install **Android Studio** and complete the setup wizard (it downloads the SDK automatically).

2. Open **SDK Manager** (Tools → SDK Manager) and install:
   - Android SDK Platform (API 33 or higher)
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools

3. Set the `ANDROID_HOME` environment variable permanently (run as Administrator):

```powershell
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "Machine")

$path = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")
[System.Environment]::SetEnvironmentVariable("PATH", "$path;$env:LOCALAPPDATA\Android\Sdk\platform-tools;$env:LOCALAPPDATA\Android\Sdk\emulator", "Machine")
```

4. Restart your terminal, then verify:

```powershell
adb --version
# Should print: Android Debug Bridge version 1.0.41 ...
```

---

## Step 2 — Create an Android Virtual Device (AVD)

1. In Android Studio open **Device Manager** (Tools → Device Manager).
2. Click **Create Device** → choose **Pixel 5** → Next.
3. Select a system image — choose **x86_64** (NOT ARM). x86_64 images run much faster on a PC.
   - Recommended: **API 33, Google APIs, x86_64**
4. In **Advanced Settings**:
   - RAM: **4096 MB**
   - Multi-Core CPU: **4**
   - Graphics: **Hardware — GLES 2.0**
   - Boot option: **Quick Boot**
5. Finish and boot the emulator.

> **Why x86_64?** ARM images require binary translation on Intel/AMD CPUs which is 10–20× slower.

---

## Step 3 — Enable Hardware Acceleration

The Android emulator needs hardware acceleration to run at a usable speed.

Run in an elevated PowerShell:

```powershell
# Enable Windows Hypervisor Platform (compatible with WSL2 and Docker Desktop)
Enable-WindowsOptionalFeature -Online -FeatureName HypervisorPlatform -All -NoRestart
```

Reboot. Then verify the emulator uses acceleration:

```powershell
# Add emulator to PATH first
$env:PATH += ";$env:LOCALAPPDATA\Android\Sdk\emulator"
emulator -accel-check
# Should say: accel: Hypervisor.Framework OS X Version ... or WHPX supported
```

---

## Step 4 — Create the MobileWright Project

```powershell
mkdir my-mobile-tests
cd my-mobile-tests
npm init -y
npm install mobilewright @mobilewright/test
```

Create `mobilewright.config.ts`:

```typescript
import { defineConfig } from 'mobilewright';

export default defineConfig({
  platform: 'android',
  bundleId: 'com.android.chrome',
  autoAppLaunch: true,
  timeout: 120_000,
  retries: 1,
  reporter: 'html',
  driver: {
    type: 'mobilecli',
  },
});
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true
  }
}
```

---

## Step 5 — Apply Windows Bug Fixes

> These are bugs in the npm packages that have not been released as fixes yet.
> You MUST apply both patches after every `npm install`.

### Fix 1 — mobilecli wrapper doesn't support Windows

**File:** `node_modules/mobilecli/index.js`

**Before (original file, lines 20–39):**

```javascript
	case "linux":
		switch (process.arch) {
			case "arm64":
				binary = "mobilecli-linux-arm64";
				break;
			case "x64":
				binary = "mobilecli-linux-amd64";
				break;
		}
		break;

	default:
		console.error(`Unsupported platform: ${process.platform}-${process.arch}`);
		process.exit(1);
```

**After (add the `win32` block between `linux` and `default`):**

```javascript
	case "linux":
		switch (process.arch) {
			case "arm64":
				binary = "mobilecli-linux-arm64";
				break;
			case "x64":
				binary = "mobilecli-linux-amd64";
				break;
		}
		break;

	case "win32":
		switch (process.arch) {
			case "x64":
				binary = "mobilecli-windows-amd64.exe";
				break;
		}
		break;

	default:
		console.error(`Unsupported platform: ${process.platform}-${process.arch}`);
		process.exit(1);
```

**Why:** The wrapper script lists Mac and Linux platform cases but omits `win32`. The Windows binary (`mobilecli-windows-amd64.exe`) ships in the package but is never selected, causing `Unsupported platform: win32-x64` at runtime.

---

### Fix 2 — getForegroundApp crashes during app launch

**File:** `node_modules/@mobilewright/driver-mobilecli/dist/driver.js`

Search for `getForegroundApp` (around line 233).

**Before:**

```javascript
    async getForegroundApp() {
        const result = await this.call('device.apps.foreground');
        return {
            bundleId: result.bundleId ?? result.packageName ?? '',
            name: result.appName,
            version: result.version,
        };
    }
```

**After:**

```javascript
    async getForegroundApp() {
        try {
            const result = await this.call('device.apps.foreground');
            return {
                bundleId: result.bundleId ?? result.packageName ?? '',
                name: result.appName,
                version: result.version,
            };
        }
        catch {
            return { bundleId: '' };
        }
    }
```

**Why:** When an app is launching, the mobilecli server briefly cannot determine the foreground app and throws an error. The internal `retryUntil()` loop does not catch exceptions — it only retries on failed conditions. This means the first transient error during launch immediately kills the test with `RpcError: could not determine foreground app`. The fix swallows the error and returns an empty bundleId so polling continues until the app is actually ready.

---

### Patches are already included in this repo — no manual steps needed

If you cloned this repository, both fixes are pre-saved as patch files in the `patches/` folder:

```
patches/
  mobilecli+0.3.71.patch
  @mobilewright+driver-mobilecli+0.0.32.patch
```

The `postinstall` script in `package.json` runs `patch-package` automatically, so a plain `npm install` applies both fixes for you:

```powershell
npm install   # patches are applied automatically at the end
```

You can verify the patches were applied by checking the output — you should see:

```
> mobilewright_learning@1.0.0 postinstall
> patch-package

patch-package 8.0.1
Applying patches...
mobilecli+0.3.71 ✔
@mobilewright+driver-mobilecli+0.0.32 ✔
```

**If you are setting up from scratch (not from this repo):** apply the two fixes manually as described above, then run:

```powershell
npm install patch-package --save-dev
npx patch-package mobilecli
npx patch-package @mobilewright/driver-mobilecli
```

Add `"postinstall": "patch-package"` to your `package.json` scripts. The patches are saved to `patches/` and committed to your repo so teammates get them automatically.

---

## Step 6 — Boot the Emulator and Install the Agent

Make sure your emulator is running, then:

```powershell
# Add ADB to PATH for this session
$env:PATH += ";$env:LOCALAPPDATA\Android\Sdk\platform-tools"

# Confirm the emulator is visible
adb devices
# Should show: emulator-5554   device

# Confirm MobileWright sees it
npx mobilewright devices
# Should show: Pixel_5   android   emulator   online

# Install the MobileWright DeviceKit agent
npx mobilewright install --device Pixel_5
```

---

## Step 7 — Grant Agent Permissions

The DeviceKit agent needs two permissions to detect the foreground app on Android:

```powershell
adb -s emulator-5554 shell appops set com.mobilenext.devicekit GET_USAGE_STATS allow
adb -s emulator-5554 shell appops set com.mobilenext.devicekit SYSTEM_ALERT_WINDOW allow
```

> These permissions reset if you uninstall and reinstall the agent. Re-run the two commands above whenever you reinstall.

---

## Step 8 — Write Your First Test

Create `example.test.ts`:

```typescript
import { test, expect } from '@mobilewright/test';

test('search mobilewright on Google', async ({ screen, device }) => {
  await device.goto('https://www.google.com/search?q=mobilewright');
  const firstResult = screen.getByLabel('mobilewright.dev', { exact: false }).first();
  await expect(firstResult).toBeVisible({ timeout: 30000 });
  await firstResult.tap();
  await expect(
    screen.getByTestId('com.android.chrome:id/url_bar')
  ).toHaveText(/mobilewright\.dev/i, { timeout: 30000 });
});
```

---

## Step 9 — Run the Test

```powershell
npx mobilewright test example.test.ts
```

Expected output:

```
Running 1 test using 1 worker
  1 passed (1.1m)
```

View the HTML report:

```powershell
npx mobilewright show-report
```

---

## Locator Reference for Android Chrome

These are the reliable locator strategies learned from debugging:

| Situation | Working Strategy | Notes |
|---|---|---|
| Chrome URL bar (page loaded) | `getByTestId('com.android.chrome:id/url_bar')` | Stable resource ID |
| Chrome URL bar (new tab page) | `getByTestId('com.android.chrome:id/search_box_text')` | Different element on NTP |
| Any element by resource-id | `getByTestId('com.example.app:id/element_id')` | Most reliable |
| Element by substring label | `getByLabel('partial text', { exact: false })` | `exact: false` required for substring |
| Any text on screen | `getByText(/regex/i)` | Regex supported |

**Avoid these** (they have bugs or limitations in the current version):

- `getByPlaceholder(regex)` — The `placeholder` field is not populated for most Android elements; always returns no match.
- `getByRole('textfield')` — Fails for `android.widget.EditText` because the role map uses short names (`edittext`) but the driver returns full class names (`android.widget.EditText`).
- `getByLabel(regex)` — The `label` strategy does not handle RegExp; only string matching works.

---

## Common Issues

### `Unsupported platform: win32-x64`
You haven't applied **Fix 1** from Step 5. The mobilecli wrapper doesn't know about Windows.

### `RpcError: could not determine foreground app`
You haven't applied **Fix 2** from Step 5. The foreground detection throws during app startup.

### `device not found: emulator-5554`
Use the AVD name (`Pixel_5`) not the ADB serial when running MobileWright commands.
ADB uses `emulator-5554`; MobileWright uses `Pixel_5`.

### `ANDROID_HOME is not set`
Run the environment variable commands from Step 1 in an elevated PowerShell and restart your terminal.

### Emulator is very slow
- Make sure you selected an **x86_64** system image (not ARM).
- Enable **Windows Hypervisor Platform** (Step 3).
- Allocate at least 4 GB RAM to the AVD.
- Set Graphics to **Hardware — GLES 2.0**.

### Chrome restores a previous session (breaks tests)
Use `device.goto('https://...')` to navigate to the exact URL you need at the start of each test instead of relying on Chrome's starting state. This bypasses session restore entirely.
