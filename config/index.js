module.exports = {
  //-- SITE SETTINGS -----
  author: "@jzbonner",
  siteTitle: "Jzbonner",
  siteShortTitle: "Think Broadly.", // Used as logo text in header, footer, and splash screen
  siteDescription: "Portfolio site for Jarrett Bonner",
  siteUrl: "https://jzbonner.me",
  siteLanguage: "en_US",
  siteIcon: "content/brain.png", // Relative to gatsby-config file
  seoTitleSuffix: "", // SEO title syntax will be e.g. "Imprint - {seoTitleSuffix}"
  useCookieBar: true, // If you use Google Analytics and want to be GDPR-compliant, set it to true
  googleAnalyticsTrackingId: "", // e.g. UA-XXXXXX-X

  // -- THEME SETTINGS -----
  colors: {
    lightTheme: {
      primary: "#000000",
      secondary: "#FFF4D9",
      tertiary: "#F2F2F2",
      text: "#000000",
      subtext: "#555555",
      background: "#FFFFFF",
      card: "#FFFFFF",
      scrollBar: "rgba(0, 0, 0, 0.5)",
      boxShadow: "rgba(0, 0, 0, 0.16)",
      boxShadowHover: "rgba(0, 0, 0, 0.32)",
    },
    darkTheme: {
      primary: "#FAFAFA",
      secondary: "#2A2926",
      tertiary: "#252525",
      text: "rgba(255, 255, 255, 0.87)",
      subtext: "#AAAAAA",
      background: "#121212",
      card: "#1C1C1C",
      scrollBar: "rgba(255, 255, 255, 0.5)",
      boxShadow: "rgba(0, 0, 0, 0.16)",
      boxShadowHover: "rgba(0, 0, 0, 0.32)",
    },
  },
  fonts: {
    primary: "Roboto, Arial, sans-serif",
  },

  //-- ARTICLES SECTION SETTINGS -----
  // You can create your own Medium feed with this rss to json converter: https://rss2json.com/
  // To access your Medium RSS feed, just replace this url with your username: https://medium.com/feed/@{yourname}
  mediumRssFeed:
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40konstantinmuenster",
  // rssFeed: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theguardian.com%2Finternational%2Frss",

  shownArticles: 3,

  //-- SOCIAL MEDIA SETTINGS -----
  // There are icons available for the following platforms:
  // Medium, GitHub, LinkedIn, XING, Behance, E-Mail
  socialMedia: [
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/jarrett-bonner/",
    },
    {
      name: "Blog",
      url: "https://jzb-lib.xyz/",
    },
    {
      name: "Github",
      url: "https://github.com/Jzbonner",
    },
    {
      name: "Spotlight",
      url: "#",
    },
    // {
    //   name: "Mail",
    //   url: "mailto:mail@konstantin.digital",
    // },
  ],

  //-- NAVIGATION SETTINGS -----
  navLinks: {
    menu: [
      {
        name: "About",
        url: "/#about",
      },
      {
        name: "Blog",
        url: "/#articles",
      },
      {
        name: "Skillset",
        url: "/#skillset",
      },
      {
        name: "Experience",
        url: "/#experience",
      },
      {
        name: "Projects",
        url: "/#projects",
      },
      {
        name: "Contact",
        url: "/#contact",
      },
    ],
    button: {
      useFileName: true,
      name: "Resume",
      fileName: false, // the file has to be placed inside the static folder at the root level
      url: "https://docs.google.com/document/d/1VxIm4JczdkoOJcBylz5pvuIAzBPQv_zguVvN2OTfJB4/edit?usp=sharing", // if useFileName=false, you can set an anchor link here and use the button for navigational purposes
    },
  },
  footerLinks: [
    {
      name: "Privacy",
      url: "/privacy",
    },
    {
      name: "Imprint",
      url: "/imprint",
    },
  ],
}
