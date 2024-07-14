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
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';


/**
 * Using Link Component from the plugin
 */
import { Link } from '@10up/block-components';

/**
 * Wordpress Block's Component
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/components
 */
import {
    PanelBody, PanelRow, Panel, PanelHeader, Placeholder, __experimentalBorderBoxControl as BorderBoxControl, __experimentalBoxControl as BoxControl
} from '@wordpress/components';

import { link as iconLink, border as iconBorder } from '@wordpress/icons';

import { getBlockTypes } from '@wordpress/blocks';

import { useRef, useEffect } from '@wordpress/element';

/**
* The edit function describes the structure of your block in the context of the
* editor. This represents what the editor will render when the block is used.
*
* @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
*
* @return {Element} Element to render.
*/
export default function Edit(props) {

    const { attributes, setAttributes } = props;

    const { link, newTab, text, border, borderRadius } = attributes;

    const blocksDissalow = useRef([]);

    const handleTextChange = value => setAttributes({ text: value });
    const handleLinkChange = value => setAttributes({
        link: value?.url,
        newTab: value?.opensInNewTab,
        text: value?.title ?? text
    });
    const handleLinkRemove = () => setAttributes({
        link: null,
        newTab: false
    });

    const setBorderRadius = value => setAttributes({
        borderRadius: value
    })

    const DISALLOWEDBLOCKS = getBlockTypes().map(block => block.name).filter(blockName => {
        if (!blockName.includes('link')) {
            blocksDissalow.current.push(blockName)
        }

        return blocksDissalow.current.indexOf(blockName) !== -1;
    });

    const setBorders = value => {
        setAttributes({
            border: value
        })
    }

    return (
        <div {...useBlockProps({
            style: {
                border: Object.values(border),
                borderTopLeftRadius: borderRadius.left,
                borderTopRightRadius: borderRadius.top,
                borderBottomLeftRadius: borderRadius.bottom,
                borderBottomRightRadius: borderRadius.right,
                overflow: 'hidden'
            }
            })}>
            <InspectorControls>
                <Panel>
                    <PanelBody title={__('Link Setting', 'sage')} initialOpen={true}>
                        <PanelRow>
                            <Placeholder label={__('Choose your link:', 'sage')} icon={iconLink}>
                                <Link
                                    value={text}
                                    url={link}
                                    opensInNewTab={newTab}
                                    onTextChange={handleTextChange}
                                    onLinkChange={handleLinkChange}
                                    onLinkRemove={handleLinkRemove}
                                    placeholder={__('Enter tooltip text here', 'sage')}
                                />
                            </Placeholder>
                        </PanelRow>
                        <PanelRow>
                            <Placeholder label={__('Border Style Control:', 'sage')} icon={iconBorder}>
                                <BorderBoxControl
                                    label={__('Border Style:', 'sage')}
                                    value={border}
                                    onChange={(val) => setBorders(val)}
                                />
                            </Placeholder>
                        </PanelRow>
                        <PanelRow>
                            <Placeholder label={__('Border Radius Style Control:', 'sage')} icon={iconBorder}>
                                <BoxControl
                                    values={borderRadius}
                                    onChange={(val) => setBorderRadius(val)}
                                />
                            </Placeholder>
                        </PanelRow>
                    </PanelBody>
                </Panel>
            </InspectorControls>
            <a data-bs-toggle={text ? "tooltip" : null} data-bs-placement={text ? "top" : null} title={text ?? null} className='link-container-component'>
                <InnerBlocks allowedBlocks={DISALLOWEDBLOCKS} />
            </a>
        </div >
    );
}