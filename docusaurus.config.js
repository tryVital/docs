// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Vital",
  tagline: "API for wearables and labs",
  url: "https://tryvital.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "vital", // Usually your GitHub org/user name.
  projectName: "vital", // Usually your repo name.
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars/sidebars.js"),
          routeBasePath: "/",
          editUrl: "https://github.com/tryVital/docs/blob/main",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
      },
    ],
  ],
  plugins: [
    "docusaurus-node-polyfills",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api-reference",
        path: "api-reference",
        routeBasePath: "api-reference",
        sidebarPath: require.resolve("./sidebars/sidebars_api.js"),
        // ... other options
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "wearables",
        path: "wearables",
        routeBasePath: "wearables",
        sidebarPath: require.resolve("./sidebars/sidebars_wearables.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "lab-testing",
        path: "lab-testing",
        routeBasePath: "lab-testing",
        sidebarPath: require.resolve("./sidebars/sidebars_lab_testing.js"),
      },
    ],

    "posthog-docusaurus",
    [
      "docusaurus2-dotenv",
      {
        systemvars: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
        title: "Vital",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
          href: "https://tryvital.io",
        },
        items: [
          {
            type: "doc",
            position: "left",
            docId: "welcome/quickstart",
            label: "Overview",
            className: "navbar-item-link",
          },
          {
            href: "/wearables/vital-link/introduction",
            label: "Wearables",
            className: "navbar-item-link",
          },
          {
            href: "/lab-testing/overview/Introduction",
            label: "Lab Testing",
            className: "navbar-item-link",
          },
          {
            href: "/api-reference/user",
            label: "API Reference",
            className: "navbar-item-link",
          },
          {
            href: "https://github.com/tryVital/",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "CNRV9KU9KI",

        // Public API key: it is safe to commit it
        apiKey: "428a4b4446022ad7fa54a36bb33cd9f5",

        indexName: "vital_docs",
        contextualSearch: true,
      },
      footer: {
        style: "dark",
        links: [],
        copyright: `Copyright ?? ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      posthog: {
        apiKey: "phc_sGkgfbOM9HoWM6oGcxjrOzIqOxyjZpSgBTYt9xNpN6n",
        enableInDevelopment: false,
      },
    }),
};

module.exports = config;
