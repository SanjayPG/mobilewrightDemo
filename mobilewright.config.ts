import { defineConfig } from 'mobilewright';

// =============================================================================
// ACTIVE CONFIG: Chrome  →  runs example.test.ts
// =============================================================================
// To run the MyDemoApp purchase journey instead:
//   1. Comment out the Chrome block below (lines up to the closing `);`)
//   2. Uncomment the MyDemoApp block further down
//   3. Run: npx mobilewright test purchase-journey.test.ts
// =============================================================================
export default defineConfig({
  platform: 'android',
  bundleId: 'com.android.chrome',   // Chrome — used by example.test.ts
  autoAppLaunch: true,
  timeout: 120_000,
  retries: 1,
  reporter: 'html',
  driver: {
    type: 'mobilecli',
  },
  // Cloud config (mobilenexthq) — uncomment when credits are topped up
  // driver: {
  //   type: 'mobile-use',
  //   apiKey: 'mob_VeVgqTbSAZJDCyjgKxwmozAXyumJjzAs7AFH',
  // },
});

// =============================================================================
// ALTERNATE CONFIG: MyDemoApp  →  runs purchase-journey.test.ts
// =============================================================================
// To activate:
//   1. Comment out the Chrome block above
//   2. Uncomment the block below (remove the leading `//` from each line)
//   3. Run: npx mobilewright test purchase-journey.test.ts
// =============================================================================
// export default defineConfig({
//   platform: 'android',
//   bundleId: 'com.saucelabs.mydemoapp.android',
//   autoAppLaunch: false,   // test controls launch (after clearing app data)
//   timeout: 120_000,
//   retries: 0,
//   reporter: 'html',
//   driver: {
//     type: 'mobilecli',
//   },
  // Cloud config (mobilenexthq) — uncomment when credits are topped up
  // driver: {
  //   type: 'mobile-use',
  //   apiKey: 'mob_VeVgqTbSAZJDCyjgKxwmozAXyumJjzAs7AFH',
  // },
// });
