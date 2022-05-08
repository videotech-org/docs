/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  docsSidebar: [
    'introduction',
    {
      type: 'category',
      label: 'Video player',
      collapsible: false,
      collapsed: false,
      items: [
        'video-player/embed-using-js-code-snippet',
      ]
    },
    {
      type: 'category',
      label: 'Audio player',
      collapsible: false,
      collapsed: false,
      items: [
        'audio-player/embed-using-js-code-snippet',
      ]
    },
    {
      type: 'category',
      label: 'Stories',
      collapsible: false,
      collapsed: false,
      items: [
        'stories/embed-using-js-code-snippet',
      ]
    },
  ],
};

module.exports = sidebars;
