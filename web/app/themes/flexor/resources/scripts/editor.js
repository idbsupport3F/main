/**
 * @see {@link https://bud.js.org/extensions/bud-preset-wordpress/editor-integration/filters}
 */
roots.register.filters('@scripts/filters');

/**
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 */
if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error);

/**
 * Accordian Block Register
 * 
 * @see {@link https://github.com/Log1x/poet/issues/22#issuecomment-792573232}
 */

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

/** components */
import images from './blocks/swiper-images'
import icons from './blocks/customIcon'

registerBlockType(`sage/swiperlogo`, {
    title: __(`Swiper Logo`, `sage`),
    category: `flexor`,
    icon: `format-gallery`,
    apiVersion: 3,
	supports: {
		className: false,
        color: {
            background:true
        },
        lock:false
	},
    edit: images
})

registerBlockType('sage/customicons', {
    title: __('Custom Icon', 'sage'),
    category: 'flexor',
    icon: 'heart',
    apiVersion: 3,
    supports: {
        lock:false
    },
    edit: icons
})