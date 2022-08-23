module.exports = {
  title: 'Z-UI',
  description: 'hk UI',
  themeConfig: {
    base: './',
    lastUpdated: "最后更新时间",
    docsDir: 'docs',
    editLinks: true,
    editLinkText: "编辑此网址",
    repo: 'https://gitee.com/login',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright @ 2022-present hk'
    },
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/component/icon', activeMatch: '/component/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: "安装", link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quieStart' }
          ]
        }
      ],
      '/component/': [
        {
          text: '基础组件',
          items: [
            { text: "Icon", link: '/component/icon' },
            { text: "Button", link: '/component/button' },
            { text: "Input", link: '/component/input' },
            { text: "Checkbox", link: '/component/checkbox' }
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: "Transfer", link: '/component/transfer' }
          ]
        }
        ,
        {
          text: '数据展示',
          items: [
            { text: "Tree", link: '/component/tree' },
            { text: "Tabs", link: '/component/tabs' },
            { text: "VirtualList", link: '/component/virtual-list' },
            { text: "Tag", link: '/component/tag' },
            { text: "Pagination", link: '/component/pagination' },
            { text: "Rate", link: '/component/rate' },
            { text: "Table", link: '/component/table' },
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: "Message", link: '/component/message' }
          ]
        }
      ]
    }
  },
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] }

  }
}