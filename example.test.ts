import { test, expect } from '@mobilewright/test';
import { execSync } from 'child_process';

test('search mobilewright on Google', async ({ screen, device }) => {
  await device.goto('https://www.google.com');

  // Chrome exposes the search EditText via its hint text in the accessibility tree.
  // getByLabel matches the hint attribute — see google-ui-hierarchy.md for details.
  // getByRole('textfield') fails here because a11y-important="false" on this element.
  await expect(screen.getByLabel('Google Search Double-tap to search Google.')).toBeVisible({ timeout: 15_000 });
  await screen.getByLabel('Google Search Double-tap to search Google.').tap();
  await screen.getByLabel('Google Search Double-tap to search Google.').fill('mobilewright');
  execSync('adb -s emulator-5554 shell input keyevent 66'); // press Enter to submit 
  // await screen.getByText('mobilewright', { exact: false }).first().tap();


  // The search results expose each link with an accessibility label containing
  // the domain — getByLabel('mobilewright.dev') finds it the same way.
  const firstResult = screen.getByLabel('mobilewright.dev', { exact: false }).first();
  await expect(firstResult).toBeVisible({ timeout: 30_000 });
  await firstResult.tap();

  // Verify mobilewright.dev loaded by checking for content on the page
  await expect(screen.getByText('Reliable mobile automation', { exact: false })).toBeVisible({ timeout: 30_000 });
});