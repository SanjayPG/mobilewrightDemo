# MobileWright Demo — Android E2E Tests on Windows

A working example of [MobileWright](https://mobilewright.dev) end-to-end tests targeting Android Chrome, set up and running on Windows.

> Includes two bug fixes required to make MobileWright work on Windows — applied automatically via `patch-package`.

---

## What's in this repo

| File | Purpose |
|---|---|
| `example.test.ts` | A working test — searches "mobilewright" on Google and clicks the first result |
| `mobilewright.config.ts` | Framework config (Android, Chrome, local driver) |
| `patches/` | Windows bug fixes auto-applied on `npm install` |
| `WINDOWS_SETUP_GUIDE.md` | Full step-by-step setup guide for Windows |

---

## Quick Start

### Prerequisites
- Node.js 18+
- Android Studio (with an x86_64 emulator booted)
- Java JDK 11+
- ADB on PATH

### 1. Clone and install

```powershell
git clone https://github.com/SanjayPG/mobilewrightDemo.git
cd mobilewrightDemo
npm install
```

> The two Windows patches are applied automatically at the end of `npm install`. You should see:
> ```
> mobilecli+0.3.71 ✔
> @mobilewright+driver-mobilecli+0.0.32 ✔
> ```

### 2. Add ADB to PATH

```powershell
$env:PATH += ";$env:LOCALAPPDATA\Android\Sdk\platform-tools"
```

### 3. Install the device agent

```powershell
npx mobilewright install --device Pixel_5
```

### 4. Grant agent permissions

```powershell
adb -s emulator-5554 shell appops set com.mobilenext.devicekit GET_USAGE_STATS allow
adb -s emulator-5554 shell appops set com.mobilenext.devicekit SYSTEM_ALERT_WINDOW allow
```

### 5. Run the test

```powershell
npx mobilewright test example.test.ts
```

Expected output:
```
Running 1 test using 1 worker
  1 passed (1.1m)
```

### 6. View the HTML report

```powershell
npx mobilewright show-report
```

---

## The Test

```typescript
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

## Windows Patches

Two bugs in the MobileWright npm packages prevent it from running on Windows. Both are fixed automatically via `patch-package`:

| Patch | File | Problem | Fix |
|---|---|---|---|
| `mobilecli+0.3.71.patch` | `node_modules/mobilecli/index.js` | `win32` platform not handled — throws `Unsupported platform: win32-x64` | Added `case "win32":` to select `mobilecli-windows-amd64.exe` |
| `@mobilewright+driver-mobilecli+0.0.32.patch` | `node_modules/@mobilewright/driver-mobilecli/dist/driver.js` | `getForegroundApp()` throws during app startup, killing the test immediately | Wrapped in try/catch to return `{ bundleId: '' }` so polling continues |

---

## Full Setup Guide

For a complete walkthrough including emulator setup, hardware acceleration, and troubleshooting see:

**[WINDOWS_SETUP_GUIDE.md](./WINDOWS_SETUP_GUIDE.md)**
