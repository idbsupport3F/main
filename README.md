<p align="center">
  <a href="https://roots.io/bedrock/">
    <img alt="Bedrock" src="https://cdn.roots.io/app/uploads/logo-bedrock.svg" height="100">
  </a>
</p>

<p align="center">
  <a href="https://packagist.org/packages/roots/bedrock">
    <img alt="Packagist Installs" src="https://img.shields.io/packagist/dt/roots/bedrock?label=projects%20created&colorB=2b3072&colorA=525ddc&style=flat-square">
  </a>

  <a href="https://packagist.org/packages/roots/wordpress">
    <img alt="roots/wordpress Packagist Downloads" src="https://img.shields.io/packagist/dt/roots/wordpress?label=roots%2Fwordpress%20downloads&logo=roots&logoColor=white&colorB=2b3072&colorA=525ddc&style=flat-square">
  </a>
  
  <img src="https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/roots/bedrock/master/composer.json&label=wordpress&logo=roots&logoColor=white&query=$.require[%22roots/wordpress%22]&colorB=2b3072&colorA=525ddc&style=flat-square">

  <a href="https://github.com/roots/bedrock/actions/workflows/ci.yml">
    <img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/roots/bedrock/ci.yml?branch=master&logo=github&label=CI&style=flat-square">
  </a>

  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/badge/follow%20@rootswp-1da1f2?logo=twitter&logoColor=ffffff&message=&style=flat-square">
  </a>
</p>

<p align="center">WordPress boilerplate with Composer, easier configuration, and an improved folder structure</p>

<p align="center">
  <a href="https://roots.io/bedrock/">Website</a> &nbsp;&nbsp; <a href="https://roots.io/bedrock/docs/installation/">Documentation</a> &nbsp;&nbsp; <a href="https://github.com/roots/bedrock/releases">Releases</a> &nbsp;&nbsp; <a href="https://discourse.roots.io/">Community</a>
</p>

## Sponsors

Bedrock is an open source project and completely free to use. If you've benefited from our projects and would like to support our future endeavors, please consider [sponsoring Roots](https://github.com/sponsors/roots).

<div align="center">
<a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="120" height="90"></a> <a href="https://carrot.com/"><img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="120" height="90"></a> <a href="https://wordpress.com/"><img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="120" height="90"></a> <a href="https://worksitesafety.ca/careers/"><img src="https://cdn.roots.io/app/uploads/worksite-safety.svg" alt="Worksite Safety" width="120" height="90"></a> <a href="https://www.itineris.co.uk/"><img src="https://cdn.roots.io/app/uploads/itineris.svg" alt="Itineris" width="120" height="90"></a>
</div>

## Overview

Bedrock is a WordPress boilerplate for developers that want to manage their projects with Git and Composer. Much of the philosophy behind Bedrock is inspired by the [Twelve-Factor App](http://12factor.net/) methodology, including the [WordPress specific version](https://roots.io/twelve-factor-wordpress/).

- Better folder structure
- Dependency management with [Composer](https://getcomposer.org)
- Easy WordPress configuration with environment specific files
- Environment variables with [Dotenv](https://github.com/vlucas/phpdotenv)
- Autoloader for mu-plugins (use regular plugins as mu-plugins)
- Enhanced security (separated web root and secure passwords with [wp-password-bcrypt](https://github.com/roots/wp-password-bcrypt))

# Package Installed
1. Main
    ```
    "php": ">=8.0",
    "roots/bedrock"
    ```
1. Sage Theme `Flexor`
    ```
    --- Dev
    "php": ">=8.0",
    "log1x/poet": "^2.1",
    "log1x/sage-directives": "^2.0",
    "roots/acorn": "^4.2"
    "@roots/sage": "6.20.0",
    "@roots/bud-sass": "^6.21.0",
    "@roots/bud": "6.20.0",
    --- Client
    "@popperjs/core": "^2.11.8",
    "aos": "^2.3.4",
    "bootstrap": "^5.3.3",
    "bootstrap-icons": "^1.11.3",
    "glightbox": "^3.3.0",
    "imagesloaded": "^5.0.0",
    "isotope-layout": "^3.0.6",
    "swiper": "^11.1.4"
    ```

## Getting Started

1. Make sure you have composer [install here](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)

2. In the current idbkl directory, run composer like this:
    ```bash
    composer install
    ```

3. Locate flexor template to run composer again
    ```bash
    # In ibkl root directory
    cd web/app/themes/flexor
    ```

4. Install using composer
    ```bash
    composer install
    ```

5. Run Yarn to install js dependencies
    ```bash
    yarn
    ```
    <details>
      <summary>How to install yarn</summary>
      Visit this <a href='https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable'>yarn installation link</a> to install yarn cli in your system
    </details>

6. Update `bud.config.js` with your local dev URL in `web/app/themes/flexor/bud.config.js`

7. Create `.env` file in root folder and copy paste from `.env.example` and configure your wordpress databases and hostnames.

8. To Compile assets, read below details:
    ```bash
    # Build Asset
    yarn build

    # Build Asset as development (Hot Reload)
    yarn dev
    ```

## Development Tips
### Create custom blocks
1. Make sure you have `poet.php` config file in `web/app/themes/your-theme/config/poet.php`. If not, run this command in your console:
    ```bash
    wp acorn vendor:publish --provider="Log1x\Poet\PoetServiceProvider"
    # or
    wp acorn vendor:publish
    # ^^^ Then choose "Log1x Poet PoetServiceProvider"
    ```

2. Add new config for blocks in `poet.php` that was created earlier:
    ```php
    // ...
    'block' => [
        'sage/accordion' => [
            'attributes' => [
                'title' => [
                    'default' => 'Lorem ipsum',
                    'type' => 'string',
                ],
            ],
        ],
    ],
    // ...
    ```

3. Create blocks file inside your theme folder in `resources/views/blocks/example.blade.php`.

4. Add this example code in `example.blade.php`:
    ```jinja
    <div class="wp-block-accordion {{ $data->className ?? '' }}">
      @isset ($data->title)
        <h2>{!! $data->title !!}</h2>
      @endisset

      <div>
        {!! $content ?? 'Please feed me InnerBlocks.' !!}
      </div>
    </div>
    ```

5. Add this code to register your own block type inside `scripts` folder in `editor.js`:
    ```js
    /**
    * Accordian Block Register
    * 
    * @see {@link https://github.com/Log1x/poet/issues/22#issuecomment-792573232}
    */

    import { __ } from '@wordpress/i18n'
    import { registerBlockType } from '@wordpress/blocks'
    import { InnerBlocks } from '@wordpress/block-editor'

    /** components */
    import edit from './accordion/edit'

    registerBlockType(`sage/accordion`, {
        title: __(`Accordion`, `sage`),
        category: `flexor`,
        icon: `format-image`,
        attributes: {
            accordions: {
                type: 'array',
                default: [{ label: 'New accordion' }],
            },
        },
        edit
    })
    ```
    > Make sure that the first argument for `registerBlockType` must be `theme-name/block-name` format.
    <details>
      <summary>Why there is no <code>save</code> property?</summary>
      Due to this <a href="https://github.com/Log1x/poet">Poet package</a> that I installed, we already had our blade laravel view setup for the save renderer. No need to add it here...
    </details>
    <details>
      <summary>Where to find <code>icon</code> tags?</summary>
      Just visit this <a href="https://developer.wordpress.org/resource/dashicons/">page</a> that wordpress specifically used. It is called Dashicons.
    </details>

6. Since you added `edit.js` import file from your `editor.js` file above, we need to create a file based on that directory example in `resources/scripts/accordion/edit.js`. Then add this codes :
    ```js
    /**
    * Retrieves the translation of text.
    *
    * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
    */
    import { __ } from '@wordpress/i18n';

    /**
    * React hook that is used to mark the block wrapper element.
    * It provides all the necessary props like the class name.
    *
    * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
    */
    import { useBlockProps } from '@wordpress/block-editor';

    /**
    * The edit function describes the structure of your block in the context of the
    * editor. This represents what the editor will render when the block is used.
    *
    * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
    *
    * @return {Element} Element to render.
    */
    export default function Edit() {
        return (
            <p {...useBlockProps()}>
                {__(
                    'Swiper Logo Slider – hello from the editor!',
                    'swiper-logo-slider'
                )}
            </p>
        );
    }
    ```
    <details>
      <summary>Woah! Where to learn this format?</summary>
      Just visit this <a href="https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/">page</a>. You also can learn attributes fetching from <a href="https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/#query-source">here</a>.
    </details>

7. When you finished, published the package and build the file.
    ```bash
    # Run Acorn Publish the vendor
    wp acorn vendor:publish --provider="Log1x\Poet\PoetServiceProvider"
    # or
    wp acorn vendor:publish
    # ^^^ Then choose "Log1x Poet PoetServiceProvider"

    #-----------------------------------------------

    # Finally Run Yarn
    yarn build
    #or
    yarn dev
    ```


## Stay Connected

- Join us on Discord by [sponsoring us on GitHub](https://github.com/sponsors/roots)
- Participate on [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/newsletter/)
