# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run all tests
npx mobilewright test

# Run a single test file
npx mobilewright test example.test.ts

# Run with HTML reporter
npx mobilewright test --reporter html

# View last HTML report
npx mobilewright show-report

# Check environment setup
npx mobilewright doctor

# List connected Android devices
npx mobilewright devices
```

ADB must be on PATH. On this machine: `C:\Users\debsa\AppData\Local\Android\Sdk\platform-tools`

```powershell
$env:PATH += ";C:\Users\debsa\AppData\Local\Android\Sdk\platform-tools"
```

## Architecture

This is a MobileWright end-to-end test project targeting Android. The framework is Playwright-style: tests import `{ test, expect }` from `@mobilewright/test` and receive `{ screen, device }` fixtures.

**Config** (`mobilewright.config.ts`): Defines platform (`android`), `bundleId`, global `timeout`, and driver. Two drivers are available:
- `mobilecli` — local driver, connects to a booted emulator/device via ADB
- `mobile-use` — cloud driver via mobilenexthq, requires an API key

**Locators** (`screen.*`): Semantic queries that auto-wait — `getByText`, `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`, `getByType`. Prefer `getByRole` or `getByPlaceholder` for input fields over `getByText`.

**Actions**: `tap()`, `fill(text)`, `doubleTap()`, `longPress()`, `swipe()`, `scrollIntoViewIfNeeded()`. All auto-wait for visibility and stability — avoid `device.waitForTimeout()` unless truly necessary.

**Assertions**: `expect(locator).toBeVisible()`, `toHaveText()`, `toContainText()`, `toBeEnabled()`. These poll/retry until satisfied or timeout.

**Device controls**: `device.launchApp(bundleId)`, `device.terminateApp(bundleId)`, `device.goto(deepLink)`, `device.setOrientation()`.

## Current target

- Platform: Android
- App under test: Chrome (`com.android.chrome`)
- Driver: `mobilecli` (local); cloud config commented out in `mobilewright.config.ts`
