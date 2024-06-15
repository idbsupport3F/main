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
      "50": "#ffe6e7",
      "100": "#ffccd0",
      "200": "#ff99a0",
      "300": "#fe6771",
      "400": "#fe3441",
      "500": "#e20110",
      "600": "#cb010e",
      "700": "#98010b",
      "800": "#660007",
      "900": "#330004",
      "950": "#190002"
    },
    "Main Color": {
      "50": "#ffece5",
      "100": "#ffd9cc",
      "200": "#ffb399",
      "300": "#ff8c66",
      "400": "#ff6633",
      "500": "#ff5921",
      "600": "#cc3300",
      "700": "#992600",
      "800": "#661a00",
      "900": "#330d00",
      "950": "#1a0600"
    },
    "Text Color": {
      "50": "#f2f2f2",
      "100": "#e6e6e6",
      "200": "#cccccc",
      "300": "#b3b3b3",
      "400": "#999999",
      "500": "#242424",
      "600": "#666666",
      "700": "#4d4d4d",
      "800": "#333333",
      "900": "#1a1a1a",
      "950": "#0d0d0d"
    },
    "Background": {
      "50": "#f2f2f2",
      "100": "#e6e6e6",
      "200": "#cccccc",
      "300": "#b3b3b3",
      "400": "#999999",
      "500": "#fdfdfd",
      "600": "#666666",
      "700": "#4d4d4d",
      "800": "#333333",
      "900": "#1a1a1a",
      "950": "#0d0d0d"
    },
    "Yellow Status": {
      "50": "#fffde6",
      "100": "#fffbcc",
      "200": "#fff899",
      "300": "#fef467",
      "400": "#fef134",
      "500": "#feed01",
      "600": "#cbbe01",
      "700": "#988e01",
      "800": "#665f00",
      "900": "#332f00",
      "950": "#191800"
    },
    "Green Status": {
      "50": "#e6feef",
      "100": "#cdfedf",
      "200": "#9bfdbf",
      "300": "#6afb9f",
      "400": "#38fa7f",
      "500": "#037f30",
      "600": "#05c74c",
      "700": "#049539",
      "800": "#026426",
      "900": "#013213",
      "950": "#01190a"
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
  app.setPublicPath('/app/themes/sage/public/');

  /**
   * Development server settings
   *
   * @see {@link https://bud.js.org/reference/bud.setUrl}
   * @see {@link https://bud.js.org/reference/bud.setProxyUrl}
   * @see {@link https://bud.js.org/reference/bud.watch}
   */
  app
    .setUrl('http://idbkl.local')
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
              "fontFamily": "var(--wp--preset--font-family--headline)"
            }
          },
          h2: {
            typography: {
              "fontFamily": "var(--wp--preset--font-family--headline)"
            }
          },
          h3: {
            typography: {
              "fontFamily": "var(--wp--preset--font-family--headline)"
            }
          },
          h4: {
            typography: {
              "fontFamily": "var(--wp--preset--font-family--headline)"
            }
          },
          h5: {
            typography: {
              "fontFamily": "var(--wp--preset--font-family--headline)"
            }
          },
          h6: {
            typography: {
              "fontFamily": "var(--wp--preset--font-family--headline)"
            }
          },
          p: {
            typography: {
              "fontFamily": "var(--wp--preset--font-family--paragraph)"
            }
          },
        }
      },
      layout: {
        contentSize: "1320px",
        wideSize: "1320px"
      }
    })
    // For Bootstrap config
    .enable();
};
