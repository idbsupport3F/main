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
   * Define the 'toKebabCase' function.
   * @param {string} string
   * @returns string
   * @see https://bit.ly/2neWfJ2
   */
  const toKebabCase = str =>
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');

  /**
   * Colors JSON properties - RAW
   */
  let colors = JSON.parse(JSON.stringify({
    "Red Status": {
      "500": "#e20110"
    },
    "Main Color": {
      "500": "#ff5921"
    },
    "Text Color": {
      "500": "#242424"
    },
    "Background": {
      "500": "#fdfdfd"
    },
    "Yellow Status": {
      "500": "#feed01"
    },
    "Green Status": {
      "500": "#037f30"
    }
  }));

  var palette = []
  var index = 0;
  for (const color in colors) {
    for (const inColor in colors[color]) {
      palette[index] = {
        slug: toKebabCase(color + inColor),
        color: colors[color][inColor],
        name: color + " " + inColor
      }
      index++;
    }
  }

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
  app.setPublicPath('/app/themes/flexor/public/');

  /**
   * Development server settings
   *
   * @see {@link https://bud.js.org/reference/bud.setUrl}
   * @see {@link https://bud.js.org/reference/bud.setProxyUrl}
   * @see {@link https://bud.js.org/reference/bud.watch}
   */
  app
    .setUrl('https://idbtrainingcentre.dbkl.gov.my')
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
        palette: palette
      },
      custom: {
        spacing: {},
        typography: {},
      },
      spacing: {
        blockGap: true,
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
      shadow: {
        defaultPresets: true,
        presets: [
          {
            name: "Natural",
            slug: "natural",
            shadow: "6px 6px 9px rgba(0, 0, 0, 0.2)"
          },
          {
            name: "Deep",
            slug: "deep",
            shadow: "12px 12px 50px rgba(0, 0, 0, 0.4)"
          },
          {
            name: "Sharp",
            slug: "sharp",
            shadow: "6px 6px 0px rgba(0, 0, 0, 0.2)"
          },
          {
            name: "Outlined",
            slug: "outlined",
            shadow: "6px 6px 0px -3px rgba(255, 255, 255, 1), 6px 6px rgba(0, 0, 0, 1)"
          },
          {
            name: "Crisp",
            slug: "crisp",
            shadow: "6px 6px 0px rgba(0, 0, 0, 1)"
          }
        ]
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
      },
      styles: {
        // https://fullsiteediting.com/lessons/theme-json-typography-options/
        elements: {
          h1: {
            typography: {
              "fontFamily": "var(--heading-font)"
            }
          },
          h2: {
            typography: {
              "fontFamily": "var(--heading-font)"
            }
          },
          h3: {
            typography: {
              "fontFamily": "var(--heading-font)"
            }
          },
          h4: {
            typography: {
              "fontFamily": "var(--heading-font)"
            }
          },
          h5: {
            typography: {
              "fontFamily": "var(--heading-font)"
            }
          },
          h6: {
            typography: {
              "fontFamily": "var(--heading-font)"
            }
          },
          p: {
            typography: {
              "fontFamily": "var(--default-font)"
            }
          },
        }
      },
      layout: {
        contentSize: "1320px"
      }
    })
    // For Bootstrap config
    .enable();
};
