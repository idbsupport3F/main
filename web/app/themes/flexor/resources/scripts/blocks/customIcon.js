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
import {
    PanelBody, PanelRow, Panel, ToggleControl, ToolbarGroup, ColorPalette, __experimentalUnitControl as UnitControl, Placeholder, TextControl, __experimentalBoxControl as BoxControl, __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption, } from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import { color as labelColor, settings } from '@wordpress/icons';

/**
 * Custom Block Components to grab IconPicker component
 * 
 * @see https://github.com/10up/block-components/tree/develop/components/icon-picker
 */

import {
    IconPickerToolbarButton,
    InlineIconPicker,
} from '@10up/block-components';

import { useCallback } from '@wordpress/element';

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

    const { icon, link, target, color, size, defaultIconStyle, paddingIconStyle, hover } = attributes;

    const colorPalette = useSelect('core/block-editor').getSettings().colors;

    const setLink = useCallback((val) => {
        setAttributes({
            link: val
        })
    }, [link])

    const setHover = useCallback((val) => {
        setAttributes({
            hover: val
        })
    }, [hover])

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

    const setDefaultIconStyle = useCallback((val) => {
        setAttributes({
            defaultIconStyle: val
        })
    }, [defaultIconStyle])

    const setPaddingIconStyle = useCallback((val) => {
        setAttributes({
            paddingIconStyle: val
        })
    }, [paddingIconStyle])


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
                    <PanelBody title={__("Icon Settings", 'sage')}>
                        <PanelRow>
                            <TextControl
                                value={link}
                                label={__("Link Rel:", "sage")}
                                onChange={(val) => setLink(val)}
                            />
                        </PanelRow>
                        {link && link.length > 0 && <PanelRow>
                            <ToggleControl
                                checked={target}
                                label={__("Open in new tab?", "sage")}
                                onChange={(val) => setTarget(val)}
                            />
                        </PanelRow>}
                        <PanelRow>
                            <UnitControl
                                label={__("Icon Size", "sage")}
                                labelPosition="top"
                                onChange={(val) => setSize(val)}
                                value={size}
                            />
                        </PanelRow>
                    </PanelBody>
                    <PanelBody title={__('Style Settings')} initialOpen={false}>
                        <PanelRow>
                            <ToggleControl
                                checked={defaultIconStyle}
                                label={__("Use Default Icon Style?", "sage")}
                                onChange={(val) => setDefaultIconStyle(val)}
                            />
                        </PanelRow>
                        {!defaultIconStyle && <PanelRow>
                            <Placeholder label={__('Icon Color', 'sage')} icon={labelColor}>
                                <ColorPalette
                                    colors={colorPalette}
                                    enableAlpha={true}
                                    value={color}
                                    onChange={(val) => setColor(val)}
                                />
                            </Placeholder>
                        </PanelRow>}
                        {defaultIconStyle && <React.Fragment>
                            <PanelRow>
                                <Placeholder label={__('Container Padding Setting')} icon={settings}>
                                    <BoxControl
                                        label={__('Padding', 'sage')}
                                        values={paddingIconStyle}
                                        resetValues={{
                                            top: '22px',
                                            right: '22px',
                                            bottom: '22px',
                                            left: '22px'
                                        }}
                                        onChange={(val) => setPaddingIconStyle(val)}
                                    />
                                </Placeholder>
                            </PanelRow>
                            <PanelRow>
                                <ToggleGroupControl label={__('Default style with or without hover effect:')} value={hover} onChange={(val) => setHover(val)} isBlock>
                                    <ToggleGroupControlOption value="hover" label={__('✅ With Hover', 'sage')} />
                                    <ToggleGroupControlOption value="nohover" label={__('🚫 Without Hover', 'sage')} />
                                </ToggleGroupControl>
                            </PanelRow>
                        </React.Fragment>}
                    </PanelBody>
                </Panel>
            </InspectorControls>
            {defaultIconStyle ? <div className={defaultIconStyle ? hover === "hover" ? "icon-component" : "icon-component-no-hover" : ""} style={{
                paddingTop: paddingIconStyle['top'] ? paddingIconStyle['top'] : 0,
                paddingRight: paddingIconStyle['right'] ? paddingIconStyle['right'] : 0,
                paddingBottom: paddingIconStyle['bottom'] ? paddingIconStyle['bottom'] : 0,
                paddingLeft: paddingIconStyle['left'] ? paddingIconStyle['left'] : 0
            }}>
                <InlineIconPicker style={{
                    color: color,
                    width: size,
                    height: size
                }} value={icon} onChange={handleIconSelection} className={"icon-preview"} />
            </div>
                :
                <InlineIconPicker style={{
                    color: color,
                    width: size,
                    height: size
                }} value={icon} onChange={handleIconSelection} className={"icon-preview"} />
            }
        </div>
    );
}
