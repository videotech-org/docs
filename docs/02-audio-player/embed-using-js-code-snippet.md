---
title: Embed using code snippet
id: embed-using-js-code-snippet

pagination_prev: null
pagination_next: null
custom_edit_url: null
---

# Embed audio player using code snippet

To embed Veedmo audio player using manual JavaScript configuration you need to add, to your website, specially prepared JavaScript code snippet and manually set all configuration options in it.

## JavaScript code snippet (sample)

Specially prepared JavaScript code snippet (mentioned below) can be added to website in various ways (e.g. via 3rd party frameworks, Google Tag Manager, ...); we recommend to inject it before closing ```</body>``` tag as it requires website's DOM (Document Object Model) to be loaded, so player could be injected in given (in configuration) query selector on page.

```js
(function veedmoAudioPlayer(j) {
  (function veedmoEl() {
    var elem = document.querySelector(j.query_selector);
    if (elem) {
      if (!window.veedmoAudioLoad) {
        window.veedmoAudioLoad = [];
        var script = document.createElement('script');
        script.onload = function () {
          for (var i = 0; i < window.veedmoAudioLoad.length; i++) {
            window.veedmoAudioLoad[i]();
          }
        };
        script.src = "//cdn.cronos.pw/cdn/audio/v1/current.js";
        document.body ? document.body.appendChild(script) : document.head.appendChild(script);
      }
      window.veedmoAudio ? new window.veedmoAudio().runManual(j) : window.veedmoAudioLoad.push(function() { new window.veedmoAudio().runManual(j); });
    } else {
      setTimeout(veedmoEl, 100);
    }
  })();
})({
  "partner_id": UNIQUE_NUMERIC_PARTNER_ID,
  "query_selector": "#element",
  "insert_method": 0,
  "audio_url": "https://cdn.veedmo-static.com/cdn/samples/audio/sample-audio.mp4",
  "audio_title": "Sample audio title",
  "tag_url_desktop": "",
  "tag_url_mobile": "",
  "position": 3,
  "corner": "bl",
  "vertical_margin": 20,
  "horizontal_margin": 20,
  "call_to_action_text": "Listen to this audio"
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
      <td><code>audio_url</code> <span class="highlight--red"><strong>*</strong></span></td>
      <td>
        URL of audio file.
        <br /><br />
        Mandatory, if <code>audio_ssml</code> is not defined. Optional, if <code>audio_ssml</code> is defined.
      </td>
    </tr>
    <tr>
      <td><code>audio_ssml</code> <span class="highlight--red"><strong>*</strong></span></td>
      <td>
        Text to be read by player's AI text-to-speach mechanism (text can be passed in plain text format or <a href="https://cloud.google.com/text-to-speech/docs/ssml" target="_blank">SSML format</a>).
        <br /><br />
        If both <code>audio_ssml</code> and <code>audio_url</code> are defined in config, <code>audio_ssml</code> will always be used as primary audio source.
        <br /><br />
        Mandatory, if <code>audio_url</code> is not defined. Optional, if <code>audio_url</code> is defined.
      </td>
    </tr>
    <tr>
      <td><code>audio_lang</code></td>
      <td>
        Language of read text (set together with <code>audio_ssml</code> parameter).
        <br /><br />
        Possible values:
        <br />
        <strong>en</strong> - English
        <br />
        <strong>th</strong> - Thai
        <br />
        <strong>dk</strong> - Danish
        <br />
        <strong>es</strong> - Spanish
        <br />
        <strong>it</strong> - Italian
        <br />
        <strong>de</strong> - German
        <br />
        <strong>fr</strong> - French
        <br />
        <strong>se</strong> - Swedish
        <br />
        <strong>no</strong> - Norwegian
        <br /><br />
        If not defined, English language will be used.
      </td>
    </tr>
    <tr>
      <td><code>tag_url_desktop</code></td>
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
      </td>
    </tr>
    <tr>
      <td><code>tag_url_mobile</code></td>
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
      </td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>
        Possible values:
        <br />
        <strong>1</strong> - player will resize to the parent container width
        <br />
        <strong>2</strong> - player will have fixed size (requires to set <code>width</code> param)
        <br /><br />
        If not defined, <strong>1</strong> (responsive size) will be used.
      </td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td>
        Player width, in pixels (px). Required only if <code>responsive</code> is set to <strong>2</strong>.
      </td>
    </tr>
    <tr>
      <td><code>floating_width</code></td>
      <td>
        Floating player width, in pixels (px). Required only if <code>position</code> is set to <strong>2</strong> or <strong>3</strong>.
        <br /><br />
        If not defined, 65 (65px) will be used.
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
      <td><code>ad_title</code></td>
      <td>
        Text displayed in player (instead of <code>audio_title</code>) only when ad is playing.
        <br /><br />
        If not defined, <strong>Advertising</strong> will be used.
      </td>
    </tr>
    <tr>
      <td><code>audio_title</code></td>
      <td>
        Title of audio added in <code>audio_url</code> param. By default it's empty.
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
        <strong>3</strong> - player will appear in page content, and switch to sticky (floating) mode when min. 50% of player height will be out of browser's viewport (sticky mode screen corner is defined in <code>corner</code> param)
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
      <td><code>block_if_adblock</code></td>
      <td>
        Player behaviour when adblock is detected in browser, and <code>tag_url_desktop</code> or <code>tag_url_mobile</code> are set.
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - play audio despite blocked ad
        <br />
        <strong>1</strong> - block audio and display custom message in player (message defined in <code>adblock_message</code> param)
        <br /><br />
        If not defined, <strong>1</strong> (block audio) will be used.
      </td>
    </tr>
    <tr>
      <td><code>adblock_message</code></td>
      <td>
        Custom message content to display in player, if adblock was detected and enabled.
        <br /><br />
        If not defined, <strong>To play this audio please disable your adblock.</strong> will be used.
      </td>
    </tr>
    <tr>
      <td><code>close_btn_time_offset</code></td>
      <td>
        Time after which X button will appear in player, in milliseconds (ms). Required only if <code>position</code> is set to <strong>2</strong> or <strong>3</strong>.
        <br /><br />
        If not defined, <strong>3000</strong> (3sec) will be used.
      </td>
    </tr>
    <tr>
      <td><code>enable_sticky_on_outside_viewport</code></td>
      <td>
        Sticky mode (<code>position</code> set to <strong>3</strong>) behaviour depending on ad status and player visibility in viewport.
        <br /><br />
        Possible values:
        <br />
        <strong>0</strong> - player will switch to sticky mode after page visitor will pass it, while scrolling the page
        <br />
        <strong>1</strong> - player will switch to sticky mode after page visitor will pass it, while scrolling the page, and additionally straight after player was loaded on page (only if player was loaded on page out of viewport)
        <br /><br />
        If not defined, <strong>0</strong> (switch to sticky mode after page visitor will pass player, while scrolling the page) will be used.
        <br /><br />
        Recommended setting: <strong>1</strong> (to maximize ad viewability).
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
      <td><code>call_to_action_text</code></td>
      <td>
        Text displayed in player after it has been loaded on page. By default it's empty.
      </td>
    </tr>
    <tr>
      <td><code>branding</code></td>
      <td>
        Customizable player branding. Branding can appear in two forms:
        <br />
        <code>corner</code> - 20px height (max. 70px width) clickable image in top right corner of player
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
    <tr>
      <td><code>customization</code></td>
      <td>
        Customizable colors of elements of player UI. Following elements' colors can be customized:
        <br />
        <code>controls_color</code> - HEX RGB (e.g. FF0000) or text value (e.g. red)
        <br />
        <code>play_control_background_color</code> - HEX RGB (e.g. FF0000) or text value (e.g. red)
        <br />
        <code>play_control_color</code> - HEX RGB (e.g. FF0000) or text value (e.g. red)
        <br />
        <code>play_progress_bar_color</code> - HEX RGB (e.g. FF0000) or text value (e.g. red)
        <br />
        <code>player_background_color</code> - HEX RGB (e.g. FF0000) or text value (e.g. red)
        <br />
        <code>player_border_color</code> - HEX RGB (e.g. FF0000) or text value (e.g. red)
      </td>
    </tr>
  </tbody>
</table>

## Live example

Below there is an the example showing how Veedmo audio player can be embedded on page using manual JavaScript configuration. Click on "Result" tab to see the result.

<iframe width="100%" height="600" src="//jsfiddle.net/veedmo/kL9zy4jf/51/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>