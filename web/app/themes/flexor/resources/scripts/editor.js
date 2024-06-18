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
import { registerIcons } from '@10up/block-components';

/** components */
import images from './blocks/swiper-images'
import icons from './blocks/customIcon'
import testimonials from './blocks/testimonials'
import { iconsPaths } from './helper/bootstrap-icons'

registerBlockType(`sage/swiperlogo`, {
    title: __(`Swiper Logo`, `sage`),
    category: `flexor`,
    icon: `format-gallery`,
    apiVersion: 3,
    supports: {
        className: false,
        color: {
            background: true
        },
        lock: false
    },
    edit: images
})

registerBlockType('sage/testimonials', {
    title: __('Testimonials', 'sage'),
    category: 'flexor',
    icon: 'format-quote',
    apiVersion: 3,
    supports: {
        lock: false
    },
    edit: testimonials
})

registerBlockType('sage/icon', {
    title: __('Icon', 'sage'),
    category: 'flexor',
    icon: 'heart',
    apiVersion: 3,
    supports: {
        lock: false
    },
    edit: icons
})

/**
 * Convert Case to any format available
 * @param {string} str 
 * @param {('camel' | 'kebab' | 'snake' | 'pascal' | 'sentence')} toCase 
 * @returns string
 * 
 * @see https://www.30secondsofcode.org/js/s/string-case-conversion/#:~:text=Kebab%20case%20is%20most%20often,join%20them%20with%20a%20hyphen.
 */
const convertCase = (str, toCase = 'camel') => {
    if (!str) return '';

    const delimiter =
        toCase === 'snake'
            ? '_'
            : toCase === 'kebab'
                ? '-'
                : ['title', 'sentence'].includes(toCase)
                    ? ' '
                    : '';

    const transform = ['camel', 'pascal'].includes(toCase)
        ? x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()
        : ['snake', 'kebab'].includes(toCase)
            ? x => x.toLowerCase()
            : toCase === 'title'
                ? x => x.slice(0, 1).toUpperCase() + x.slice(1)
                : x => x;

    const finalTransform =
        toCase === 'camel'
            ? x => x.slice(0, 1).toLowerCase() + x.slice(1)
            : toCase === 'sentence'
                ? x => x.slice(0, 1).toUpperCase() + x.slice(1)
                : x => x;

    const words = str.match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    );

    return finalTransform(words.map(transform).join(delimiter));
};


const SVGJSON = function(iconsObj) {

    const icons = [];

    const setIcons = function(obj) {
        var name = convertCase(obj.name, 'kebab');
        var label = convertCase(obj.name, 'sentence');
        if(obj.paths.length > 0) {
            var pathSVG = obj.paths.map((path, i) => {
                var svg = document.createElement('path');
                Object.keys(path).forEach((currentVal) => {
                    svg.setAttribute(currentVal, path[currentVal])
                })
                return svg.outerHTML;
            }).join(' ');
        }
        var source = `<svg fill="${obj.fill}" viewBox="${obj.viewBox}" height="16" width="16" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;">${pathSVG}</svg>`

        return {
            source,
            name,
            label
        }
    }

    for (const property in iconsObj){
        icons.push(setIcons(iconsObj[property]));
    }

    return icons;
}


/**
 * Icon Set Configurations
 * 
 * @see https://github.com/Machacek76/svg-to-json
 * @see https://github.com/10up/block-components/tree/develop/api/register-icons
 */
registerIcons({
    name: 'sage/bootstrap-icons',
    label: "Bootstrap Icons",
    icons: SVGJSON(iconsPaths)
});