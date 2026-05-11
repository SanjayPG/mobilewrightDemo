# Appium Inspector Setup — Windows + Android Emulator

Step-by-step guide to install and use Appium Inspector to inspect UI elements on a running Android emulator.

---

## Prerequisites

- Node.js installed (check: `node -v`)
- Android Studio installed with an emulator configured
- ADB available on PATH (check: `adb devices`)
- Java (JDK) installed (check: `java -version`)

---

## Step 1 — Install Appium (global)

```powershell
npm install -g appium
```

Verify:
```powershell
appium --version
```

---

## Step 2 — Install the UiAutomator2 driver

```powershell
appium driver install uiautomator2
```

Verify:
```powershell
appium driver list --installed
```

You should see `uiautomator2` listed.

---

## Step 3 — Set Android environment variables

Appium needs to know where your Android SDK is. Run these once in PowerShell (persists across restarts):

```powershell
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdk, "User")
[System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $sdk, "User")
```

Then close and reopen your terminal for the variables to take effect.

Verify:
```powershell
$env:ANDROID_HOME
# Should print: C:\Users\<you>\AppData\Local\Android\Sdk
```

---

## Step 4 — Download Appium Inspector

Go to the Appium Inspector releases page on GitHub and download the latest Windows `.exe` installer.

Search: **"Appium Inspector releases GitHub"**

Direct path to look for: `appium-inspector` → Releases → `Appium-Inspector-Setup-<version>.exe`

Install it (run the `.exe`).

---

## Step 5 — Start your Android emulator

Open Android Studio → Device Manager → Start your emulator.

Confirm it's running:
```powershell
adb devices
# Should show: emulator-5554   device
```

---

## Step 6 — Start the Appium server

In a terminal (keep it running in the background):

```powershell
appium
```

You should see output like:
```
[Appium] Appium REST http interface listener started on http://0.0.0.0:4723
```

---

## Step 7 — Open Appium Inspector

Launch the Appium Inspector app you installed in Step 4.

---

## Step 8 — Configure the server connection

In Appium Inspector, at the top set:

| Field | Value |
|-------|-------|
| Remote Host | `127.0.0.1` |
| Remote Port | `4723` |
| Remote Path | `/` |

---

## Step 9 — Configure capabilities

Click **Edit JSON** (the pencil/JSON icon) and paste:

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554",
  "appium:noReset": true,
  "appium:uiautomator2ServerInstallTimeout": 60000
}
```

Key notes:
- `noReset: true` — connects to whatever app is currently open without resetting anything
- `uiautomator2ServerInstallTimeout: 60000` — gives extra time for the UiAutomator2 server APK to install on first run (fixes "Settings app not running after 30000ms" error)
- Remove `appium:app` or `appium:appPackage` if you just want to inspect whatever is on screen

---

## Step 10 — Start the session

Click **Start Session**.

Appium Inspector will:
1. Connect to your Appium server
2. Install the UiAutomator2 server on the emulator (first time only — takes ~30s)
3. Take a screenshot and show the element tree on the right

---

## Step 11 — Inspect elements

- Click any element in the screenshot on the left
- The right panel shows all attributes: `text`, `content-desc`, `resource-id`, `class`, `hint`, `clickable`, `focusable`, etc.
- These attributes map directly to MobileWright locators:

| Appium attribute | MobileWright locator |
|-----------------|---------------------|
| `text` | `getByText('...')` |
| `content-desc` | `getByLabel('...')` |
| `hint` | `getByLabel('...')` |
| `resource-id` | `getByTestId('...')` |
| `class` = EditText | `getByRole('textfield')` |
| `class` = Button | `getByRole('button')` |

---

## Troubleshooting

### "Could not connect to Appium server"
- Make sure `appium` is running in a terminal (Step 6)
- Check Remote Path is `/` not `/wd/hub`

### "ANDROID_HOME not set" or "ANDROID_SDK_ROOT not set"
- Redo Step 3 and restart your terminal

### "Settings app is not running after 30000ms"
- Add `"appium:uiautomator2ServerInstallTimeout": 60000` to your capabilities (Step 9)

### "Application not inspectable" 
- Make sure your emulator is booted and `adb devices` shows `device` (not `offline`)
- Make sure `noReset: true` is set so Appium doesn't try to launch a specific app

### Elements show in tree but getByRole fails in MobileWright
- Check `a11y-important` attribute — if `false`, MobileWright may skip the element
- Use `getByLabel` (hint/content-desc) or `getByTestId` (resource-id) instead
- Example: Google search EditText has `a11y-important="false"` so `getByRole('textfield')` fails; use `getByLabel('Google Search Double-tap to search Google.')` instead

---

## Refreshing the element tree

After navigating to a new screen in the emulator, click the **refresh** button (circular arrow) in Appium Inspector to re-capture the current UI state.

You do NOT need to stop and restart the session — just refresh.
