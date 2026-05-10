import { test, expect } from '@mobilewright/test';

test('search mobilewright on Google', async ({ screen, device }) => {
  await device.goto('https://www.google.com/search?q=mobilewright');
  const firstResult = screen.getByLabel('mobilewright.dev', { exact: false }).first();
  await expect(firstResult).toBeVisible({ timeout: 30000 });
  await firstResult.tap();
  await expect(screen.getByTestId('com.android.chrome:id/url_bar')).toHaveText(/mobilewright\.dev/i, { timeout: 30000 });
});
