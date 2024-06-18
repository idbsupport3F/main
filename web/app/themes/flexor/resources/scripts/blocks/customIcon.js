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
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';


/**
 * Wordpress Block's Component
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/components
 */
import { PanelBody, PanelRow, Panel, ToggleControl, PanelHeader, ToolbarGroup, ColorPalette, __experimentalUnitControl as UnitControl, Placeholder } from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import { color as labelColor } from '@wordpress/icons';

/**
 * Custom Block Components to grab IconPicker component
 * 
 * @see https://github.com/10up/block-components/tree/develop/components/icon-picker
 */

import {
    IconPicker,
    IconPickerToolbarButton,
    InlineIconPicker,
} from '@10up/block-components';

import { useCallback, useEffect, useState } from '@wordpress/element';

import { useIcons } from '@10up/block-components';

// import { iconSet } from '../helper'

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

    const { icon, link, target, color, size } = attributes;

    // const iconSet = useIcons('sage/bootstrap-icons');

    const colorPalette = useSelect('core/block-editor').getSettings().colors;

    const setLink = useCallback((val) => {
        setAttributes({
            link: val
        })
    }, [link])

    const setTarget = useCallback((val) => {
        setAttributes({
            target: val
        })
    }, [target]);

    const setSize = useCallback((val) => {
        setAttributes({
            size: val
        })
    }, [size])

    const setColor = useCallback((val) => {
        setAttributes({
            color: val
        })
    }, [color])


    const handleIconSelection = useCallback((val) => {
        setAttributes({
            icon: {
                name: val.name,
                iconSet: val.iconSet,
                source: val.source
            }
        })
    })

    return (
        <div {...useBlockProps({
            className: 'icon'
        })}>
            <BlockControls>
                <ToolbarGroup>
                    <IconPickerToolbarButton value={icon} onChange={handleIconSelection} />
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <Panel>
                    <PanelBody title="Icon Settings">
                        <PanelRow>
                            <ToggleControl
                                checked={link}
                                label={__("Link Pressed?", "sage")}
                                onChange={(val) => setLink(val)}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                checked={target}
                                label={__("Open in new tab?", "sage")}
                                onChange={(val) => setTarget(val)}
                            />
                        </PanelRow>
                        <PanelRow>
                            <UnitControl
                                label={__("Icon Size", "sage")}
                                labelPosition="top"
                                onChange={(val) => setSize(val)}
                                value={size}
                            />
                        </PanelRow>
                        <PanelRow>
                            <Placeholder label={__('Icon Color', 'sage')} icon={labelColor}>
                                <ColorPalette
                                    colors={colorPalette}
                                    enableAlpha={true}
                                    value={color}
                                    onChange={(val) => setColor(val)}
                                />
                            </Placeholder>
                        </PanelRow>
                    </PanelBody>
                </Panel>
            </InspectorControls>
            <InlineIconPicker style={{
                color: color,
                width: size
            }} value={icon} onChange={handleIconSelection} className="icon-preview" />
        </div>
    );
}
