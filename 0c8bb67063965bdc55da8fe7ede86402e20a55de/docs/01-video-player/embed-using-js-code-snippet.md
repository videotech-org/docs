---
title: Embed using code snippet
id: embed-using-js-code-snippet

pagination_prev: null
pagination_next: null
custom_edit_url: null
---

# Embed video player using code snippet

To embed Veedmo video player using manual JavaScript configuration you need to add, to your website, specially prepared JavaScript code snippet and manually set all configuration options in it.

## JavaScript code snippet (sample)

Specially prepared JavaScript code snippet (mentioned below) can be added to website in various ways (e.g. via 3rd party frameworks, Google Tag Manager, ...); we recommend to inject it before closing ```</body>``` tag as it requires website's DOM (Document Object Model) to be loaded, so player could be injected in given (in configuration) query selector on page.

```js
(function veedmoPlayer(j) {
  (function veedmoEl() {
    var elem = document.querySelector(j.query_selector);
    if (elem) {
      if (!window.veedmoLoad) {
        window.veedmoLoad = [];
        var script = document.createElement('script');
        script.onload = function () {
          for (var i = 0; i < window.veedmoLoad.length; i++) {
            window.veedmoLoad[i]();
          }
        };
        script.src = "//cdn.veedmo-static.com/cdn/player/v2/current.js";
        document.body ? document.body.appendChild(script) : document.head.appendChild(script);
      }
      window.veedmo ? new window.veedmo().runManual(j) : window.veedmoLoad.push(function() { new window.veedmo().runManual(j); });
    } else {
      setTimeout(veedmoEl, 100);
    }
  })();
})({
  "partner_id": UNIQUE_NUMERIC_PARTNER_ID,
  "query_selector": "#element",
  "insert_method": 0,
  "autoplay": 3,
  "muted": 1,
  "ad_type": 1,
  "video_url": "https://cdn.veedmo-static.com/cdn/samples/videos/sample-video-waves.mp4",
  "video_title": "Sample video title",
  "tag_url_desktop": "",
  "tag_url_mobile": "",
  "position": 3,
  "responsive": 1,
  "corner": "bl",
  "vertical_margin": 20,
  "horizontal_margin": 20,
  "minimum_width": 140,
  "maximum_width": 400,
  "maximum_width_percent": 25,
  "maximum_height_percent_mobile": 25,
});
```

## Configuration parameters

Below there is a list of supported configuration parameters. <span class="highlight--red"><strong>*</strong></span> - mandatory parameter.

<table>
  <tbody>
    <tr>
      <td><strong>Param</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td><code>partner_id</code> <span class="highlight--red"><strong>*</strong></span></td>
      <td>
        Unique numeric ID of Veedmo partner account. <a class="nav-link" data-section-id="contact">Contact us</a> to obtain your partner account and <code>partner_id</code>.
      </td>
    </tr>
    <tr>
      <td><code>query_selector</code> <span class="highlight--red"><strong>*</strong></span></td>
      <td>
        JavaScript querySelector (e.g. id, class name) of the page element to inject player into.
        <br /><br />
        IMPORTANT: do not use <strong>veedmo</strong> as your query selector name as it is system reserved name.
      </td>
    </tr>
    <tr>
      <td><code>ad_type</code> <span class="highlight--red"><strong>*</strong></span></td>
      <td>
        Possible values:
        <br />
        <strong>0</strong> - outstream (in this case, there is no need to specify <code>video_url</code> param - can be empty)
        <br />
        <strong>1</strong> - instream (in this case, <code>video_url</code> param has to be set too)
      </td>
    </tr>
    <tr>
      <td><code>tag_url_desktop</code> <span class="highlight--red"><strong>*</strong></span></td>
      <td>
        URL(s) of ad tag(s), or pure XML(s) content of ad(s), to display on desktop devices. If empty, no ad(s) will be displayed on desktop devices.
        <br /><br />
        Handles single URL, or XML content of ad tag, or multiple URLs / XMLs content, via waterfall mechanism.
        <br /><br />
        To set up waterfall mechanism, pass array of objects, where each object contains ad tag URL / XML content, and a type (acceptable types are: <code>vast</code> - for ad tag URL(s), and <code>vastxml</code> - for ad XML(s) content).
        <br /><br />
        Example:
        <code>
          "tag_url_desktop": [<br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;url: "AD_TAG_1 URL",
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;type: "vast"
          <br />
          &nbsp;&nbsp;{"}"},<br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;url: "AD_TAG_2 pure XML content",
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;type: "vastxml"
          <br />
          &nbsp;&nbsp;{"}"},<br />
          ],
        </code>
        Waterfall mechanism waits max. 5sec for each ad request to return response. If no ad, empty ad or ad error is returned, mechanism jumps to next ad tag, in set order, and performs request.
        <br /><br />
        Mandatory, if <code>ad_type</code> is set to <strong>0</strong>. Optional, if <code>ad_type</code> is set to <strong>1</strong>.
      </td>
    </tr>
    <tr>
      <td><code>tag_url_mobile</code> <span class="highlight--red"><strong>*</strong></span></td>
      <td>
        URL(s) of ad tag(s), or pure XML(s) content of ad(s), to display on mobile devices. If empty, no ad(s) will be displayed on mobile devices.
        <br /><br />
        Handles single URL, or XML content of ad tag, or multiple URLs / XMLs content, via waterfall mechanism.
        <br /><br />
        To set up waterfall mechanism, pass array of objects, where each object contains ad tag URL / XML content, and a type (acceptable types are: <code>vast</code> - for ad tag URL(s), and <code>vastxml</code> - for ad XML(s) content).
        <br /><br />
        Example:
        <code>
          "tag_url_mobile": [<br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;url: "AD_TAG_1 URL",
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;type: "vast"
          <br />
          &nbsp;&nbsp;{"}"},<br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;url: "AD_TAG_2 pure XML content",
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;type: "vastxml"
          <br />
          &nbsp;&nbsp;{"}"},<br />
          ],
        </code>
        Waterfall mechanism waits max. 5sec for each ad tag request to return response. If no ad, empty ad or ad error is returned, mechanism jumps to next ad tag, in set order, and performs request.
        <br /><br />
        Mandatory, if <code>ad_type</code> is set to <strong>0</strong>. Optional, if <code>ad_type</code> is set to <strong>1</strong>.
      </td>
    </tr>
    <tr>
      <td><code>video_url</code> <span class="highlight--red"><strong>*</strong></span></td>
      <td>
        URL of video file. Mandatory, if <code>ad_type</code> is set to <strong>1</strong>. Optional, if <code>ad_type</code> is set to <strong>0</strong>.
      </td>
    </tr>
    <tr>
      <td><code>responsive</code> <span class="highlight--red"><strong>*</strong></span></td>
      <td>
        Possible values:
        <br />
        <strong>1</strong> - player will resize to the parent container width
        <br />
        <strong>2</strong> - player will have fixed size (requires to set <code>width</code> param)
      </td>
    </tr>
    <tr>
      <td><code>insert_method</code></td>
      <td>
        Possible values:
        <br />
        <strong>0</strong> - inject player inside "query_selector" target element (appendChild)
        <br />
        <strong>1</strong> - inject player before "query_selector" target element (beforebegin)
        <br />
        <strong>2</strong> - inject player inside "query_selector" target element, after its last child (beforeend)
        <br />
        <strong>3</strong> - inject player inside "query_selector" target element, before its first child (afterbegin)
        <br />
        <strong>4</strong> - inject player after "query_selector" target element (afterend)
        <br /><br />
        If not defined, <strong>0</strong> (appendChild) will be used.
      </td>
    </tr>
    <tr>
      <td><code>autoplay</code></td>
      <td>
        Possible values:
        <br />
        <strong>1</strong> - autoplay off
        <br />
        <strong>2</strong> - autoplay on
        <br />
        <strong>3</strong> - autoplay starts when min. 50% of player height is in browser's viewport
        <br /><br />
        If not defined, <strong>1</strong> (autoplay off) will be used.
      </td>
    </tr>
    <tr>
      <td><code>muted</code></td>
      <td>
        Possible values:
        <br />
        <strong>0</strong> - muted off
        <br />
        <strong>1</strong> - muted on
        <br /><br />
        If not defined, <strong>0</strong> (muted off) will be used.
        <br /><br />
        Recommended setting: <strong>1</strong> (as browser tend to block unmuted videos when trying to autoplay).
      </td>
    </tr>
    <tr>
      <td><code>video_title</code></td>
      <td>
        Title of video added in <code>video_url</code> param. By default it's empty.
      </td>
    </tr>
    <tr>
      <td><code>video_description</code></td>
      <td>
        Description of video added in <code>video_url</code> param. By default it's empty.
      </td>
    </tr>
    <tr>
      <td><code>video_poster</code></td>
      <td>
        URL of video's poster image (shown in player before video starts to play). By default it's empty.
      </td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td>
        Player width, in pixels (px). Required only if <code>responsive</code> is set to <strong>2</strong>.
      </td>
    </tr>
    <tr>
      <td><code>maximum_height_percent_mobile</code></td>
      <td>
        Max. height of floating player (<code>position</code> set to <strong>2</strong> or <strong>3</strong>) on mobile devices only, in percentage (%) - value relative to mobile device screen height.
        <br /><br />
        If set to <strong>0</strong>, or not defined at all, the player will set its height automatically, based on video size.
        <br /><br />
        Recommended setting: <strong>20</strong> or <strong>25</strong> (to keep player in viewport, maximize viewability, and not annoy visitor).
      </td>
    </tr>
    <tr>
      <td><code>position</code></td>
      <td>
        Possible values:
        <br />
        <strong>1</strong> - player will appear in page content
        <br />
        <strong>2</strong> - player (floating) will appear in corner of the screen (corner defined in <code>corner</code> param)
        <br />
        <strong>3</strong> - player will appear in page content, and switch to floating mode when min. 50% of player height will be out of browser's viewport (floating mode screen corner is defined in <code>corner</code> param)
        <br /><br />
        If not defined, <strong>1</strong> (in page content) will be used.
        <br /><br />
        Recommended setting: <strong>3</strong> (to maximize viewability).
      </td>
    </tr>
    <tr>
      <td><code>corner</code></td>
      <td>
        Corner of the screen in which floating player will appear. Required only if <code>position</code> is set to <strong>2</strong> or <strong>3</strong>.
        <br /><br />
        Possible values:
        <br />
        <strong>bl</strong> - bottom left corner of the screen
        <br />
        <strong>br</strong> - bottom right corner of the screen
        <br />
        <strong>tl</strong> - top left corner of the screen
        <br />
        <strong>tr</strong> - top right corner of the screen
        <br /><br />
        If not defined, <strong>br</strong> (bottom right) will be used.
      </td>
    </tr>
    <tr>
      <td><code>vertical_margin</code></td>
      <td>
        Floating player distance from top / bottom (depending on set <code>corner</code> param value) edge of the screen, in pixels (px). Required only if <code>position</code> is set to <strong>2</strong> or <strong>3</strong>.
        <br /><br />
        If not defined, <strong>20</strong> (20px) will be used.
      </td>
    </tr>
    <tr>
      <td><code>horizontal_margin</code></td>
      <td>
        Floating player distance from left / right (depending on set <code>corner</code> param value) edge of the screen, in pixels (px). Required only if <code>position</code> is set to <strong>2</strong> or <strong>3</strong>.
        <br /><br />
        If not defined, <strong>20</strong> (20px) will be used.
      </td>
    </tr>
    <tr>
      <td><code>minimum_width</code></td>
      <td>
        Floating player min. width, in pixels (px). Required only if <code>position</code> is set to <strong>2</strong> or <strong>3</strong>.
        <br /><br />
        If not defined, <strong>140</strong> (140px) will be used.
      </td>
    </tr>
    <tr>
      <td><code>maximum_width</code></td>
      <td>
        Floating player max. width, in pixels (px). Required only if <code>position</code> is set to <strong>2</strong> or <strong>3</strong>.
        <br /><br />
        If not defined, <strong>500</strong> (500px) will be used.
      </td>
    </tr>
    <tr>
      <td><code>maximum_width_percent</code></td>
      <td>
        Floating player width, in percentage (%) - value relative to screen width. Required only if <code>position</code> is set to <strong>2</strong> or <strong>3</strong>.
        <br /><br />
        If not defined, <strong>30</strong> (30%) will be used.
      </td>
    </tr>
    <tr>
      <td><code>aspect_ratio</code></td>
      <td>
        Player's aspect ratio.
        <br /><br />
        Possible values:
        <br />
        <strong>16:9</strong>
        <br />
        <strong>4:3</strong>
        <br />
        <strong>1:1</strong>
        <br />
        <strong>9:16</strong>
        <br /><br />
        If not defined, player will use video's aspect ratio and scale automatically to it.
      </td>
    </tr>
    <tr>
      <td><code>block_if_adblock</code></td>
      <td>
        Player behaviour when adblock is detected in browser, and <code>tag_url_desktop</code> or <code>tag_url_mobile</code> are set.
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - play video despite blocked ad
        <br />
        <strong>1</strong> - block video and display custom message in player (message defined in <code>adblock_message</code> param)
        <br /><br />
        If not defined, <strong>1</strong> (block video) will be used.
      </td>
    </tr>
    <tr>
      <td><code>adblock_message</code></td>
      <td>
        Custom message content to display in player, if adblock was detected and enabled.
        <br /><br />
        If not defined, <strong>To watch this video please disable your adblock.</strong> will be used.
      </td>
    </tr>
    <tr>
      <td><code>close_btn_time_offset</code></td>
      <td>
        Time after which X button will appear in floating player, in milliseconds (ms). Required only if <code>position</code> is set to <strong>2</strong> or <strong>3</strong>, or <code>ad_type</code> is set to <strong>0</strong>.
        <br /><br />
        If not defined, <strong>3000</strong> (3sec) will be used.
      </td>
    </tr>
    <tr>
      <td><code>close_btn_skip_ad</code></td>
      <td>
        To maximize ad impressions, X button (closing player's floating mode - when <code>position</code> is set to <strong>2</strong> or <strong>3</strong>) can be used to skip ads (or ad pods) instead of direcly closing floating mode (and decreasing chances to more ad impressions).
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - do not skip ads (or ad pods) on click in X button (floating mode)
        <br />
        <strong>1</strong> - skip ads (or ad pods) on click in X button (floating mode)
        <br /><br />
        If not defined, <strong>0</strong> (do not skip ads on clicks in X button) will be used.
      </td>
    </tr>
    <tr>
      <td><code>ad_empty_autoplay</code></td>
      <td>
        Autoplay behaviour (on / off) depending on ad status.
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - autoplay will start only if ad returned by ad server was not empty, or there was no ad error
        <br />
        <strong>1</strong> - autoplay will start always
        <br /><br />
        If not defined, <strong>1</strong> (start always) will be used.
        <br /><br />
        Recommended setting: <strong>0</strong> (to maximize ad viewability, and not use data transfer when visitor cannot be monetized).
      </td>
    </tr>
    <tr>
      <td><code>ad_empty_hide_player</code></td>
      <td>
        Player show / hide behaviour depending on ad status.
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - player will always appear on page
        <br />
        <strong>1</strong> - player will appear on page only if ad returned by ad server was not empty, or there was no ad error
        <br /><br />
        If not defined, <strong>0</strong> (appear always) will be used.
        <br /><br />
        Recommended setting: <strong>0</strong> (to avoid page content jumping).
      </td>
    </tr>
    <tr>
      <td><code>ad_empty_or_played_disable_sticky</code></td>
      <td>
        Floating mode (<code>position</code> set to <strong>3</strong>) behaviour depending on ad status.
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - player will always switch to floating mode
        <br />
        <strong>1</strong> - player will switch to floating mode:
        <br />
        - if ad returned by ad server was not empty, or there was no ad error
        <br />
        - until last ad returned by ad server, has finished to play
        <br /><br />
        If not defined, <strong>0</strong> (always switch to floating mode) will be used.
        <br /><br />
        Recommended setting: <strong>1</strong> (to maximize ad viewability, and not annoy visitor).
      </td>
    </tr>
    <tr>
      <td><code>ad_empty_callback</code></td>
      <td>
        Callback funtion called when no pre-roll ad will be returned by ad server, or visitor has ad block enabled and ad cannot be obtained from ad server.
        <br /><br />
        If both, <code>ad_empty_callback</code> and <code>ad_empty_player</code> are defined, <code>ad_empty_player</code> has priority, and launches as first.
        <br /><br />
        Example:
        <code>
          "ad_empty_callback": function() {"{"}
          <br />
          &nbsp;&nbsp;// JavaScript code to run
          <br />
          {"}"}
        </code>
        If not defined, it is not used.
      </td>
    </tr>
    <tr>
      <td><code>ad_empty_player</code></td>
      <td>
        Fallback called when no pre-roll ad will be returned by ad server, allowing to load alternative player config (e.g. if instream ad won't be returned by ad server, fallback to outstream ad).
        <br /><br />
        If both, <code>ad_empty_callback</code> and <code>ad_empty_player</code> are defined, <code>ad_empty_player</code> has priority, and launches as first.
        <br /><br />
        Example (fallback instream to outstream):
        <code>
          "ad_empty_player": {"{"}
          <br />
          &nbsp;&nbsp;"ad_type": 0, // outstream ads
          <br />
          &nbsp;&nbsp;"tag_url_desktop": "AD_TAG_1 URL",
          <br />
          &nbsp;&nbsp;"tag_url_mobile": "AD_TAG_2 URL",
          <br />
          {"}"}
        </code>
        If not defined, it is not used.
      </td>
    </tr>
    <tr>
      <td><code>enable_sticky_on_outside_viewport</code></td>
      <td>
        Floating mode (<code>position</code> set to <strong>3</strong>) behaviour depending on ad status and player visibility in viewport.
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - player will switch to floating mode after page visitor will pass it, while scrolling the page
        <br />
        <strong>1</strong> - player will switch to floating mode after page visitor will pass it, while scrolling the page, and additionally straight after player was loaded on page (only if ad was returned by ad server, and player was loaded on page out of viewport)
        <br /><br />
        If not defined, <strong>0</strong> (switch to floating mode after page visitor will pass player, while scrolling the page) will be used.
        <br /><br />
        Recommended setting: <strong>1</strong> (to maximize ad viewability).
      </td>
    </tr>
    <tr>
      <td><code>block_playback_outside_viewport</code></td>
      <td>
        Playback status depending on player visibility to the page visitor.
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - do not pause playback when player is not visible to the visitor
        <br />
        <strong>1</strong> - pause playback, when player is not visible to the visitor (auto resume playback when player is visible to the visitor)
        <br /><br />
        If not defined, <strong>1</strong> (pause playback, when player is not visible to the visitor) will be used.
        <br /><br />
        Recommended setting: <strong>1</strong> (to not hurt CPMs and ad revenue).
      </td>
    </tr>
    <tr>
      <td><code>consent_string_timeout</code></td>
      <td>
        Delays player load to wait for page visitor to accept page's privacy policies, in seconds.
        <br /><br />
        If not defined, player on load (before requesting ad) will check page visitor's privacy policies consent status and use it when requesting ad.
      </td>
    </tr>
    <tr>
      <td><code>seo_metadata</code></td>
      <td>
        Adds video schema markup, based on <a href="https://developers.google.com/search/docs/advanced/structured-data/video" target="_blank">VideoObject schema</a>, to make search engines better aware of the type of content you have on your website. Added markup data are: <code>name</code>, <code>duration</code>, <code>description</code>, <code>contentUrl</code>, <code>thumbnailUrl</code>.
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - do not add video schema markup to the player
        <br />
        <strong>1</strong> - add video schema markup to the player
        <br /><br />
        If not defined, <strong>0</strong> (do not add video schema markup) will be used.
      </td>
    </tr>
    <tr>
      <td><code>branding</code></td>
      <td>
        Customizable player branding. Branding can appear in two forms:
        <br />
        <code>corner</code> - 20px height (max. 70px width) clickable image in top right corner of player (appears only on paused/finished video)
        <br />
        <code>bar</code> - 16px height bar (with 10px height image) on bottom of player (appears always, when configured - hidden by default)
        <br /><br />
        <code>corner</code> and <code>bar</code> are objects, with 3 configurable parameters each:
        <br />
        <strong>text</strong> - text which will appear (on hover of corner image, or on bottom bar)
        <br />
        <strong>link</strong> - URL which will be opened on click on text set in <code>text</code> or / and <code>image</code>
        <br />
        <strong>image</strong> - URL of image (formats: *.jpg, *.png, *.svg) which will appear in corner, or on bar (after the text)
        <br /><br />
        If not defined, only <strong>Powered by Veedmo</strong> will appear in top right corner of player.
      </td>
    </tr>
  </tbody>
</table>

## Macros

<table>
  <tbody>
    <tr>
      <td><strong>Macro</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td><code>$$WIDTH$$</code></td>
      <td>Numeric value. Returns player width, in pixels.</td>
    </tr>
    <tr>
      <td><code>$$HEIGHT$$</code></td>
      <td>Numeric value. Returns player height, in pixels.</td>
    </tr>
    <tr>
      <td><code>$$REFERER$$</code></td>
      <td>Returns hostname and path of website, where player is embedded (e.g. <code>domain.com/news/article</code>).</td>
    </tr>
    <tr>
      <td><code>$$REFERER_DOMAIN$$</code></td>
      <td>Returns hostname of website, where player is embedded (e.g. <code>domain.com</code>).</td>
    </tr>
    <tr>
      <td><code>$$GDPR$$</code></td>
      <td>
        Passes information about GDPR status on website:
        <br />
        <strong>0</strong> - GDPR not required
        <br />
        <strong>1</strong> - GDPR required
        <br /><br />
        Used in pair with the $$GDPR_CONSENT$$ macro.
        <br /><br />
        IMPORTANT: <a href="https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework" target="_blank">IAB’s GDPR Transparency & Consent Framework</a> must be implemented on website for this to work.
      </td>
    </tr>
    <tr>
      <td><code>$$GDPR_CONSENT$$</code></td>
      <td>
        Passes GDPR consent string content, only when GDPR is required (defined by $$GDPR$$ macro). If GDPR is not required, value is not set.
        <br /><br />
        Used in pair with the $$GDPR$$ macro.
        <br /><br />
        IMPORTANT: <a href="https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework" target="_blank">IAB’s GDPR Transparency & Consent Framework</a> must be implemented on website for this to work.
      </td>
    </tr>
  </tbody>
</table>

## Live example

Below there is an the example showing how Veedmo video player can be embedded on page using manual JavaScript configuration. Click on "Result" tab to see the result.

### Instream player example

<iframe width="100%" height="600" src="//jsfiddle.net/veedmo/qfroesdy/104/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Outstream player example

<iframe width="100%" height="600" src="//jsfiddle.net/veedmo/tsL3z72m/7/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>