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
  // Cloud config (mobilenexthq) — uncomment when credits are topped up
  // driver: {
  //   type: 'mobile-use',
  //   apiKey: 'mob_VeVgqTbSAZJDCyjgKxwmozAXyumJjzAs7AFH',
  // },
});
