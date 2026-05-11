# Google.com UI Hierarchy — Chrome on Android (Emulator)

Captured with Appium Inspector on `emulator-5554` while viewing `https://www.google.com`.  
Use this as a reference when locators break or Chrome updates change the tree.

## Key Elements for MobileWright Tests

### Search Input (inside WebView)

```
android.widget.SearchView  resource-id="tsf"
  clickable="false"  focusable="false"   ← DO NOT target this
  └─ android.widget.EditText
       hint="Google Search Double-tap to search Google."
       clickable="true"  focusable="true"   ← TARGET THIS
       bounds="[176,787][638,925]"
```

**MobileWright locator:**
```typescript
screen.getByLabel('Google Search Double-tap to search Google.')
```
The `hint` attribute is exposed as the accessibility label. `getByRole('textfield')` may fail because `a11y-important="false"` on this element.

---

### Chrome URL Bar (native — always accessible)

```
android.widget.EditText
  resource-id="com.android.chrome:id/url_bar"
  text="google.com"
  hint="Search Google or type URL"
  clickable="true"  focusable="true"
  bounds="[220,136][673,290]"
```

**MobileWright locator:**
```typescript
screen.getByLabel('Search Google or type URL')
// or
screen.getByTestId('com.android.chrome:id/url_bar')
```

---

### Chrome Toolbar Buttons

| Element | content-desc | resource-id |
|---------|-------------|-------------|
| Home | `Open the home page` | `com.android.chrome:id/home_button` |
| New tab | `New tab` | `com.android.chrome:id/optional_toolbar_button` |
| Tab switcher | `See 8 tabs` | `com.android.chrome:id/tab_switcher_button` |
| Menu | `Customize and control Google Chrome` | `com.android.chrome:id/menu_button` |
| Site security | `Connection is secure` | `com.android.chrome:id/location_bar_status_icon` |

---

### Google Homepage (WebView content)

| Element | class | locator hint |
|---------|-------|-------------|
| Google logo | `android.widget.Image` | `content-desc="Google"` |
| Search by voice | `android.widget.Button` | `text="Search by voice"` |
| Search with camera | `android.view.View` | `content-desc="Search using your camera or photos"` |
| Search with AI | `android.view.View` | `content-desc="Search with AI"` |
| Google apps | `android.widget.Button` | `content-desc="Google apps"` |
| Sign in | `android.view.View` | `content-desc="Sign in"` |
| Trending searches list | `android.widget.ListView` | — |

---

## Full XML Hierarchy

```xml
<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
<hierarchy index="0" class="hierarchy" rotation="0" width="1080" height="2340">
  <android.widget.FrameLayout index="0" package="com.android.chrome" class="android.widget.FrameLayout" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,0][1080,2340]" displayed="true" a11y-important="true" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
    <android.widget.LinearLayout index="0" package="com.android.chrome" class="android.widget.LinearLayout" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,0][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="1" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
      <android.widget.FrameLayout index="0" package="com.android.chrome" class="android.widget.FrameLayout" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,0][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="2" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
        <android.widget.FrameLayout index="0" package="com.android.chrome" class="android.widget.FrameLayout" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,0][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="1" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
          <android.widget.FrameLayout index="0" package="com.android.chrome" class="android.widget.FrameLayout" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,0][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="1" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
            <android.widget.FrameLayout index="0" package="com.android.chrome" class="android.widget.FrameLayout" text="" resource-id="android:id/content" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,0][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="1" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
              <android.widget.FrameLayout index="0" package="com.android.chrome" class="android.widget.FrameLayout" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,0][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="1" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
                <android.widget.FrameLayout index="0" package="com.android.chrome" class="android.widget.FrameLayout" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,136][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="1" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
                  <android.view.ViewGroup index="0" package="com.android.chrome" class="android.view.ViewGroup" text="" resource-id="com.android.chrome:id/coordinator" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,136][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="2" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
                    <android.widget.FrameLayout index="0" package="com.android.chrome" class="android.widget.FrameLayout" text="" resource-id="com.android.chrome:id/compositor_view_holder" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,136][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="1" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
                      <android.widget.FrameLayout index="0" package="com.android.chrome" class="android.widget.FrameLayout" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,136][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="1" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
                        <android.view.SurfaceView index="0" package="com.android.chrome" class="android.view.SurfaceView" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,136][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="1" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780" />
                      </android.widget.FrameLayout>
                      <android.widget.FrameLayout index="1" package="com.android.chrome" class="android.widget.FrameLayout" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,136][1080,2340]" displayed="true" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" window-id="780">
                        <android.webkit.WebView index="0" package="com.android.chrome" class="android.webkit.WebView" text="Google" checkable="false" checked="false" clickable="false" enabled="true" focusable="true" focused="true" long-clickable="false" password="false" scrollable="true" selected="false" bounds="[0,290][1080,2340]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="true" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780">
                          <android.view.View index="0" package="com.android.chrome" class="android.view.View" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,290][1080,2340]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780">
                            <android.view.View index="2" package="com.android.chrome" class="android.view.View" text="" resource-id="gb-main" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,290][1080,2340]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780">
                              <!-- Header row: Main menu + tab filters + Sign in -->
                              <android.view.View index="1" package="com.android.chrome" class="android.view.View" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,290][1080,433]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780">
                                <android.view.View index="0" package="com.android.chrome" class="android.view.View" text="Search settings" resource-id="og-te" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,290][154,433]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780">
                                  <android.widget.Button index="0" package="com.android.chrome" class="android.widget.Button" text="Main menu" checkable="false" checked="false" clickable="true" enabled="true" focusable="true" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,290][154,433]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780" />
                                </android.view.View>
                                <!-- Tab filters: ALL, IMAGES, etc -->
                                <android.view.View index="2" package="com.android.chrome" class="android.view.View" text="" resource-id="vLkmZd" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[657,290][1080,433]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780">
                                  <android.widget.Button index="0" package="com.android.chrome" class="android.widget.Button" text="" content-desc="Google apps" checkable="false" checked="false" clickable="true" enabled="true" focusable="true" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[668,301][781,413]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780" />
                                  <android.view.View index="1" package="com.android.chrome" class="android.view.View" text="&amp;ec=GAZAmgQ" content-desc="Sign in" checkable="false" checked="false" clickable="true" enabled="true" focusable="true" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[816,301][1025,411]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780" />
                                </android.view.View>
                              </android.view.View>
                              <!-- Main content: logo + search box + trending list -->
                              <android.view.View index="2" package="com.android.chrome" class="android.view.View" text="" resource-id="n0tgWb" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,430][1080,2209]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780">
                                <!-- Google logo -->
                                <android.widget.Image index="0" package="com.android.chrome" class="android.widget.Image" text="" content-desc="Google" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[319,584][761,741]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780" />
                                <!-- Search box area -->
                                <android.view.View index="1" package="com.android.chrome" class="android.view.View" text="" resource-id="main" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,787][1080,2143]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780">
                                  <!-- SearchView container — NOT interactable (clickable=false, focusable=false) -->
                                  <android.widget.SearchView index="0" package="com.android.chrome" class="android.widget.SearchView" text="" resource-id="tsf" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[22,787][1058,925]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780">
                                    <!-- Google Search button (icon) -->
                                    <android.widget.Button index="1" package="com.android.chrome" class="android.widget.Button" text="" content-desc="Google Search" checkable="false" checked="false" clickable="true" enabled="true" focusable="true" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[44,787][178,925]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780" />
                                    <!-- THE ACTUAL SEARCH INPUT — use this -->
                                    <android.widget.EditText index="0" package="com.android.chrome" class="android.widget.EditText" text="" checkable="false" checked="false" clickable="true" enabled="true" focusable="true" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[176,787][638,925]" displayed="true" hint="Google Search Double-tap to search Google." a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780" />
                                    <!-- Search with AI -->
                                    <android.view.View index="3" package="com.android.chrome" class="android.view.View" text="" content-desc="Search with AI" checkable="false" checked="false" clickable="true" enabled="true" focusable="true" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[638,787][770,925]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780" />
                                    <!-- Voice search -->
                                    <android.widget.Button index="4" package="com.android.chrome" class="android.widget.Button" text="Search by voice" resource-id="Q7Ulpb" checkable="false" checked="false" clickable="true" enabled="true" focusable="true" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[770,787][902,925]" displayed="true" hint="" a11y-important="false" screen-reader-focusable="false" drawing-order="0" showing-hint="false" text-entry-key="false" dismissable="false" a11y-focused="false" heading="false" live-region="0" context-clickable="false" content-invalid="false" tooltip-text="" window-id="780" />
                                    <!-- Camera search -->
                                    <android.view.View index="5" package="com.android.chrome" class="android.view.View" content-desc="Search using your camera or photos" checkable="false" checked="false" clickable="true" enabled="true" focusable="true" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[902,787][1034,925]" displayed="true" hint="" window-id="780" />
                                  </android.widget.SearchView>
                                  <!-- Trending searches list -->
                                  <android.widget.TextView index="2" package="com.android.chrome" class="android.widget.TextView" text="Trending searches" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[66,988][1009,1068]" displayed="true" heading="true" window-id="780" />
                                  <android.widget.ListView index="4" package="com.android.chrome" class="android.widget.ListView" text="" checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false" long-clickable="false" password="false" scrollable="false" selected="false" bounds="[0,1104][1080,2143]" displayed="true" hint="" window-id="780">
                                    <!-- Trending items (content-desc = item text) -->
                                    <android.view.View index="0" content-desc="baftas 2026 tv awards" clickable="true" focusable="true" bounds="[0,1104][1080,1252]" window-id="780" />
                                    <android.view.View index="1" content-desc="viral story kirk deighton library" clickable="true" focusable="true" bounds="[0,1249][1080,1398]" window-id="780" />
                                    <android.view.View index="2" content-desc="costa coffee" clickable="true" focusable="true" bounds="[0,1395][1080,1541]" window-id="780" />
                                    <android.view.View index="3" content-desc="hantavirus infections cruise ship" clickable="true" focusable="true" bounds="[0,1538][1080,1687]" window-id="780" />
                                    <android.view.View index="4" content-desc="fitbit air tracker" clickable="true" focusable="true" bounds="[0,1684][1080,1832]" window-id="780" />
                                    <android.view.View index="5" content-desc="rochdale football Football club" clickable="true" focusable="true" bounds="[0,1830][1080,2000]" window-id="780" />
                                    <android.view.View index="6" content-desc="kent county council prayer debate" clickable="true" focusable="true" bounds="[0,1997][1080,2143]" window-id="780" />
                                  </android.widget.ListView>
                                </android.view.View>
                              </android.view.View>
                            </android.view.View>
                          </android.view.View>
                        </android.webkit.WebView>
                      </android.widget.FrameLayout>
                    </android.widget.FrameLayout>
                    <!-- Chrome toolbar (native, always accessible) -->
                    <android.widget.FrameLayout index="1" resource-id="com.android.chrome:id/control_container" bounds="[0,136][1080,293]" window-id="780">
                      <android.view.ViewGroup resource-id="com.android.chrome:id/toolbar_container" bounds="[0,136][1080,293]" window-id="780">
                        <android.widget.FrameLayout resource-id="com.android.chrome:id/toolbar" bounds="[0,136][1080,290]" window-id="780">
                          <android.widget.ImageButton content-desc="Open the home page" resource-id="com.android.chrome:id/home_button" clickable="true" bounds="[0,136][132,290]" window-id="780" />
                          <android.view.ViewGroup resource-id="com.android.chrome:id/location_bar" bounds="[132,136][673,290]" window-id="780">
                            <android.widget.LinearLayout resource-id="com.android.chrome:id/location_bar_status" clickable="true" focusable="true" bounds="[132,136][220,290]" window-id="780">
                              <android.widget.ImageView content-desc="Connection is secure" resource-id="com.android.chrome:id/location_bar_status_icon" bounds="[143,180][209,246]" window-id="780" />
                            </android.widget.LinearLayout>
                            <!-- URL Bar — native EditText, always accessible -->
                            <android.widget.EditText
                              text="google.com"
                              resource-id="com.android.chrome:id/url_bar"
                              hint="Search Google or type URL"
                              clickable="true" focusable="true"
                              bounds="[220,136][673,290]"
                              window-id="780" />
                          </android.view.ViewGroup>
                          <android.widget.LinearLayout resource-id="com.android.chrome:id/toolbar_buttons" bounds="[673,136][1080,290]" window-id="780">
                            <android.widget.ImageButton content-desc="New tab" resource-id="com.android.chrome:id/optional_toolbar_button" clickable="true" bounds="[673,136][816,290]" window-id="780" />
                            <android.widget.ImageButton content-desc="See 8 tabs" resource-id="com.android.chrome:id/tab_switcher_button" clickable="true" bounds="[816,136][948,290]" window-id="780" />
                            <android.widget.ImageButton content-desc="Customize and control Google Chrome" resource-id="com.android.chrome:id/menu_button" clickable="true" bounds="[948,136][1080,290]" window-id="780" />
                          </android.widget.LinearLayout>
                        </android.widget.FrameLayout>
                      </android.view.ViewGroup>
                    </android.widget.FrameLayout>
                  </android.view.ViewGroup>
                </android.widget.FrameLayout>
              </android.widget.FrameLayout>
            </android.widget.FrameLayout>
          </android.widget.FrameLayout>
        </android.widget.FrameLayout>
      </android.widget.FrameLayout>
    </android.widget.LinearLayout>
  </android.widget.FrameLayout>
</hierarchy>
```
