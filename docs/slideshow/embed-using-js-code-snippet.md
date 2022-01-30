---
title: Embed using code snippet
id: embed-using-js-code-snippet

pagination_prev: null
pagination_next: null
custom_edit_url: null
---

# Embed slideshow using code snippet

To embed Veedmo slideshow using manual JavaScript configuration you need to add, to your website, specially prepared JavaScript code snippet and manually set all player options in it.

## JavaScript code snippet (sample)

Specially prepared JavaScript code snippet (mentioned below) can be added to website in various ways (e.g. via 3rd party frameworks, Google Tag Manager, ...); we recommend to inject it before closing ```</body>``` tag as it requires website's DOM (Document Object Model) to be loaded, so player could be injected in given (in configuration) query selector on page.

```js
(function veedmoSlider(config) {
  (function veedmoSliderApply() {
    var el = document.querySelector(config.query_selector);
    if (el) {
      var script = document.createElement("script");
      script.src = "https://cdn.veedmo-static.com/cdn/slideshow/v1/current.js";
      document.body ? document.body.appendChild(script) : document.head.appendChild(script);
      script.addEventListener("load", () => {
        window.veedmoSlider(config);
      });
    } else {
      setTimeout(veedmoSliderApply, 100);
    }
  })();
})({
  "partner_id": UNIQUE_NUMERIC_PARTNER_ID,
  "rss_url": "https://www.theverge.com/rss/index.xml",
  "max_slides_amount": 5,
  "query_selector": "#element",
  "slide_duration": 4,
  "theme_color": "#2962ff",
  "max_number_of_injected_ads": 0,
  "video_player_config": {
    "tag_url_desktop": "",
    "tag_url_mobile": ""
  }
});
```

## Configuration parameters

Below there is a list of supported configuration parameters. ```*``` - mandatory parameter.

<table>
  <tbody>
    <tr>
      <td><strong>Param</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td><code>partner_id</code> *</td>
      <td>
        Unique numeric ID of Veedmo partner account. <a class="nav-link" data-section-id="contact">Contact us</a> to obtain your partner account and <code>partner_id</code>.
      </td>
    </tr>
    <tr>
      <td><code>query_selector</code> *</td>
      <td>
        JavaScript querySelector (e.g. id, class name) of the page element to inject slideshow into.
        <br /><br />
        IMPORTANT: do not use <strong>veedmo</strong> as your query selector name as it is system reserved name.
      </td>
    </tr>
    <tr>
      <td><code>rss_url</code> *</td>
      <td>
        URL of RSS feed to generate slideshow from.
      </td>
    </tr>
    <tr>
      <td><code>slide_duration</code></td>
      <td>
        Time duration of showing single slide (in seconds).
      </td>
    </tr>
    <tr>
      <td><code>max_slides_amount</code></td>
      <td>
        Max. number of slides to be shown in slideshow.
        <br /><br />
        If not defined, <strong>10</strong> will be used.
      </td>
    </tr>
    <tr>
      <td><code>theme_color</code></td>
      <td>
        Slideshow theme color, used on: progress bars, title bar, hover on controls - HEX RGB (e.g. FF0000) or text value (e.g. red).
      </td>
    </tr>
    <tr>
      <td><code>max_number_of_injected_ads</code></td>
      <td>
        Max. number of ads injected in slideshow. Cannot be greater than <code>max_slides_amount</code>.
        <br /><br />
        Ad is injected after slide.
      </td>
    </tr>
    <tr>
      <td><code>video_player_config</code></td>
      <td>
        Config of video player, handling ads, shown after slides. It is an object containing two elements, <code>tag_url_desktop</code> and <code>tag_url_mobile</code>.
        <br /><br />
        <code>tag_url_desktop</code> - URL(s) of ad tag(s), or pure XML(s) content of ad(s), to display on desktop devices. If empty, no ad(s) will be displayed on mobile devices.
        <br />
        <code>tag_url_mobile</code> - URL(s) of ad tag(s), or pure XML(s) content of ad(s), to display on mobile devices. If empty, no ad(s) will be displayed on mobile devices.
        <br /><br />
        <code>tag_url_desktop</code> and <code>tag_url_mobile</code> handle single URL, or XML content of ad tag, or multiple URLs / XMLs content, via waterfall mechanism.
        <br /><br />
        To set up waterfall mechanism, pass array of objects, where each object contains ad tag URL / XML content, and a type (acceptable types are: <code>vast</code> - for ad tag URL(s), and <code>vastxml</code> - for ad XML(s) content).
        <br /><br />
        Example:
        <br />
        <code>
          "tag_url_desktop": [<br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;url: "AD_1 URL",
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;type: "vast"
          <br />
          &nbsp;&nbsp;{"}"},<br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;url: "AD_2 XML content",
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;type: "vastxml"
          <br />
          &nbsp;&nbsp;{"}"},<br />
          ],
          <br />
          "tag_url_mobile": [<br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;url: "AD_1 URL",
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;type: "vast"
          <br />
          &nbsp;&nbsp;{"}"},<br />
          &nbsp;&nbsp;{"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;url: "AD_2 XML content",
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
      <td><code>show_items_without_img</code></td>
      <td>
        Possible values:
        <br />
        <strong>0</strong> - do not show, in slideshow, items from RSS feed which do not have image
        <br />
        <strong>1</strong> - show, in slideshow, items from RSS feed which do not have image
        <br /><br />
        If not defined, <strong>0</strong> (do not show items without image) will be used.
      </td>
    </tr>
    <tr>
      <td><code>branding</code></td>
      <td>
        Customizable slideshow branding. Branding appears as 32px height (proportional width) clickable image in top right corner of slideshow.
        <br /><br />
        <code>corner</code> branding is an object, with 3 configurable parameters:
        <br />
        <strong>text</strong> - text which will appear (on hover of corner image, or on bottom bar)
        <br />
        <strong>link</strong> - URL which will be opened on click on image set in <code>image</code>
        <br />
        <strong>image</strong> - URL of image (formats: *.jpg, *.png, *.svg) which will appear in corner
        <br /><br />
        If not defined, only <strong>Powered by Veedmo</strong> will appear in top right corner of slideshow.
      </td>
    </tr>
  </tbody>
</table>

## Live example

Below there is an the example showing how Veedmo slideshow can be embedded on page using manual JavaScript configuration. Click on "Result" tab to see the result.

<iframe width="100%" height="600" src="//jsfiddle.net/veedmo/qex6ckLm/11/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>