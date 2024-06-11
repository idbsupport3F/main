/**
 * Compiler configuration
 *
 * @see {@link https://roots.io/sage/docs sage documentation}
 * @see {@link https://bud.js.org/learn/config bud.js configuration guide}
 *
 * @type {import('@roots/bud').Config}
 */
export default async (app) => {
  /**
   * Application assets & entrypoints
   *
   * @see {@link https://bud.js.org/reference/bud.entry}
   * @see {@link https://bud.js.org/reference/bud.assets}
   */
  app
    .entry('app', ['@scripts/app', '@styles/app'])
    .entry('editor', ['@scripts/editor', '@styles/editor'])
    .assets(['images'])
    .assets(['bootstrap-icons']);

  /**
   * Set public path
   *
   * @see {@link https://bud.js.org/reference/bud.setPublicPath}
   */
  app.setPublicPath('/app/themes/sage/public/');

  /**
   * Development server settings
   *
   * @see {@link https://bud.js.org/reference/bud.setUrl}
   * @see {@link https://bud.js.org/reference/bud.setProxyUrl}
   * @see {@link https://bud.js.org/reference/bud.watch}
   */
  app
    .setUrl('http://ibdkl.local')
    .setProxyUrl('http://example.test')
    .watch(['resources/views', 'app']);

  /**
   * Generate WordPress `theme.json`
   *
   * @note This overwrites `theme.json` on every build.
   *
   * @see {@link https://bud.js.org/extensions/sage/theme.json}
   * @see {@link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json}
   */
  app.wpjson
    .setSettings({
      background: {
        backgroundImage: true,
      },
      color: {
        custom: true,
        customDuotone: false,
        customGradient: false,
        defaultDuotone: false,
        defaultGradients: false,
        defaultPalette: false,
        duotone: [],
        palette: [
          {
            "slug": "red/red-status-500",
            "color": "#E20110",
            "name": "Red 500"
          }, 
          {
            "slug": "blue/red-status-50",
            "color": "#FFE6E7",
            "name": "Red 950"
          }
        ]
      },
      custom: {
        spacing: {},
        typography: {},
      },
      spacing: {
        blockGap: null,
        customSpacingSize: true,
        margin: true,
        padding: true,
        spacingScale: {
          operator: "*",
          increment: 1.333,
          steps: 7,
          mediumStep: 1.333,
          unit: "pixel"
        },
        padding: true,
        units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
      },
      typography: {
        "customFontSize": true,
        "dropCap": true,
        "fontStyle": true,
        "fontWeight": true,
        "letterSpacing": true,
        "lineHeight": false,
        "textColumns": false,
        "textDecoration": true,
        "textTransform": true,
        "writingMode": false,
        'font-size': {},
        'line-height': {},
        'fontFamilies': [
          {
            "name": "Headline",
            "slug": "headline",
            "fontFamily": "'Raleway',  sans-serif"
          },
          {
            "name": "Paragraph",
            "slug": "paragraph",
            "fontFamily": "'Roboto',  system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
          },
        ]

      }
    })
    .enable();
};
