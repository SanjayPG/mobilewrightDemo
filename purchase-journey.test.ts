// /**
//  * Purchase Journey Test — MyDemoApp (com.saucelabs.mydemoapp.android)
//  *
//  * HOW TO RUN:
//  *   1. Open mobilewright.config.ts
//  *   2. Comment out the Chrome block and uncomment the MyDemoApp block
//  *   3. npx mobilewright test purchase-journey.test.ts
//  *   4. Restore the Chrome config when done (so example.test.ts keeps working)
//  *
//  * WHAT IT TESTS:
//  *   Full end-to-end purchase journey:
//  *   Login → browse product → add to cart → checkout →
//  *   shipping address → payment → review → place order → confirm
//  *
//  * TEST ACCOUNT:  bod@example.com / 10203040  (built-in demo account)
//  * PRODUCT:       Sauce Labs Backpack — $29.99  (total $35.98 with tax/shipping)
//  */

// import { test, expect } from '@mobilewright/test';
// import { execSync } from 'child_process';

// const DEVICE = 'emulator-5554';  // change if your emulator has a different serial

// test.beforeEach(async ({ screen }) => {
//   // The framework (via the device fixture) already terminates and re-launches the
//   // app before each test. Login state persists across restarts (SharedPreferences),
//   // so we use the app's own menu to log out and ensure a clean, logged-out state.

//   // Wait for the app to be ready on the catalog before opening the drawer.
//   await expect(screen.getByLabel('View menu')).toBeVisible({ timeout: 15_000 });
//   await screen.getByLabel('View menu').tap();

//   // isVisible(timeout:0) is a non-throwing, instant check — no auto-wait.
//   const isLoggedIn = await screen.getByText('Log Out').isVisible({ timeout: 0 });
//   if (isLoggedIn) {
//     await screen.getByText('Log Out').tap();
//     // After log-out the app returns to the catalog (logged-out state)
//     await expect(screen.getByText('Products')).toBeVisible({ timeout: 10_000 });
//   } else {
//     // Already logged out — close the drawer by tapping the hamburger again (toggle).
//     // Do NOT use KEYCODE_BACK here: on the root catalog screen it exits the app
//     // instead of closing the drawer.
//     await screen.getByLabel('View menu').tap();
//     await expect(screen.getByLabel('View menu')).toBeVisible({ timeout: 5_000 });
//   }
// });

// test('complete purchase journey — Sauce Labs Backpack', async ({ screen }) => {

//   // ── Step 1: Login ────────────────────────────────────────────────────────────
//   await screen.getByLabel('View menu').tap();
//   // The drawer menu item text is "Log In" (with a space — not "Login")
//   await screen.getByText('Log In').scrollIntoViewIfNeeded();
//   await screen.getByText('Log In').tap();

//   // Wait until the login form is on screen before interacting
//   await expect(screen.getByText('Username')).toBeVisible({ timeout: 10_000 });

//   // Tapping "bod@example.com" auto-populates both username and password fields.
//   // If that shortcut is ever removed, replace with:
//   //   await screen.getByTestId('com.saucelabs.mydemoapp.android:id/nameET').fill('bod@example.com');
//   //   await screen.getByTestId('com.saucelabs.mydemoapp.android:id/passwordET').fill('10203040');
//   await screen.getByText('bod@example.com').tap();

//   // The page title is also "Login" (TextView) — use the button's accessibility
//   // label to avoid ambiguity with the title text.
//   await screen.getByLabel('Tap to login with given credentials').tap();

//   // Confirm we landed back on the product catalogue
//   await expect(screen.getByText('Products')).toBeVisible({ timeout: 15_000 });

//   // ── Step 2: Open the Sauce Labs Backpack product page ───────────────────────
//   // getByText('Sauce Labs Backpack') matches multiple elements with a shared
//   // resource-id but different text content; .first() picks the exact-text match.
//   // Tap the product image (label="Product Image") — the title TextView may not
//   // propagate the tap to the RecyclerView item's click listener, but the image does.
//   // We locate the image that immediately precedes the "Sauce Labs Backpack" title
//   // by scrolling until the title is visible, then tapping its associated image.
//   await screen.getByText('Sauce Labs Backpack').scrollIntoViewIfNeeded();
//   // Use the title locator to tap the product card — UIAutomator's click action
//   // propagates through the view hierarchy to the item's click listener.
//   await screen.getByText('Sauce Labs Backpack').first().tap();

//   // Confirm we're on the product detail page
//   await expect(screen.getByText(/add to cart/i)).toBeVisible({ timeout: 10_000 });

//   // ── Step 3: Add to cart ──────────────────────────────────────────────────────
//   await screen.getByText(/add to cart/i).scrollIntoViewIfNeeded();
//   await screen.getByText(/add to cart/i).tap();

//   // ── Step 4: Open the cart ────────────────────────────────────────────────────
//   await screen.getByLabel('Displays number of items in your cart').tap();

//   // Confirm we're on the cart page
//   await expect(screen.getByText('My Cart')).toBeVisible({ timeout: 10_000 });

//   // ── Step 5: Proceed to checkout ──────────────────────────────────────────────
//   await screen.getByText('Proceed To Checkout').tap();

//   // ── Step 6: Shipping address ─────────────────────────────────────────────────
//   // getByPlaceholder matches each EditText by its Android hint/placeholder text.
//   // fill() clears any existing content before typing the new value.
//   await expect(screen.getByText('Enter a shipping address')).toBeVisible({ timeout: 10_000 });
//   await screen.getByPlaceholder('Rebecca Winter').fill('Sanjay Gorai');    // Full Name
//   await screen.getByPlaceholder('Mandorley 112').fill('123 Main St');      // Address Line 1
//   // Address Line 2 is optional — skip it
//   await screen.getByPlaceholder('Truro').fill('Austin');                    // City
//   await screen.getByPlaceholder('Cornwall').fill('Texas');                  // State / Region
//   await screen.getByPlaceholder('89750').fill('78701');                     // Zip Code
//   await screen.getByPlaceholder('United Kingdom').fill('United States');    // Country

//   await screen.getByText('To Payment').tap();

//   // ── Step 7: Payment details ───────────────────────────────────────────────────
//   await expect(screen.getByText('Enter a payment method')).toBeVisible({ timeout: 10_000 });
//   // The payment page reuses "Rebecca Winter" as the cardholder name placeholder.
//   await screen.getByPlaceholder('Rebecca Winter').fill('Sanjay Gorai');              // Cardholder name
//   await screen.getByPlaceholder('3258 1256 7568 7891').fill('3258 1256 7568 7891');  // Card number
//   await screen.getByPlaceholder('03/25').fill('03/25');                              // Expiry date
//   await screen.getByPlaceholder('123').fill('123');                                  // Security code
//   // "My billing address is the same as my shipping address" checkbox is pre-ticked

//   await screen.getByText('Review Order').tap();

//   // ── Step 8: Review order ─────────────────────────────────────────────────────
//   await expect(screen.getByText('Review your order')).toBeVisible({ timeout: 10_000 });
//   await expect(screen.getByText('Sauce Labs Backpack')).toBeVisible();
//   await expect(screen.getByText('$ 35.98')).toBeVisible();

//   await screen.getByText('Place Order').tap();

//   // ── Step 9: Confirm checkout complete ────────────────────────────────────────
//   await expect(screen.getByText('Checkout Complete')).toBeVisible({ timeout: 15_000 });
//   await expect(screen.getByText('Thank you for your order')).toBeVisible();
// });
