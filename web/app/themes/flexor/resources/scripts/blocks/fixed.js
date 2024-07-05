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
import { useBlockProps, InnerBlocks, InspectorControls, BlockControls } from '@wordpress/block-editor';

/**
 * Custom Block Components to grab IconPicker component
 * 
 * @see https://github.com/10up/block-components/tree/develop/components/icon-picker
 */
import {
    IconPickerToolbarButton,
    InlineIconPicker,
    IconPicker
} from '@10up/block-components';

/**
 * Wordpress Block's Component
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/components
 */
import {
    PanelBody, PanelRow, Panel, PanelHeader, Placeholder, __experimentalBorderBoxControl as BorderBoxControl, __experimentalBoxControl as BoxControl,
    __experimentalUnitControl as UnitControl,
    __experimentalAlignmentMatrixControl as AlignmentMatrixControl,
    ToggleControl,
    ColorPalette,
    ToolbarGroup
} from '@wordpress/components';

import { border as iconBorder, color as labelColor, settings } from '@wordpress/icons';


import { useState, useEffect, useCallback } from '@wordpress/element';

import { useSelect } from '@wordpress/data';

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

    const { mobilePosition, icon, border, borderRadius, backgroundColor, paddingIcon, size } = attributes;

    const [ mobileView, setMobileView ] = useState(false);

    const colorPalette = useSelect('core/block-editor').getSettings().colors;

    const setMobileViewValue = useCallback((val) => {
        setMobileView(val);
    }, [mobileView])

    const setBorderRadius = value => setAttributes({
        borderRadius: value
    })

    const setSize = value => setAttributes({
        size: value
    })

    const setBorders = value => {
        setAttributes({
            border: value
        })
    }

    const setIcon = value => {
        setAttributes({
            icon: value
        });
    }

    const setPaddingIcon = value => {
        setAttributes({
            paddingIcon: value
        })
    }

    const setMobilePosition = value => {
        var positionMobile = '';
        switch (value) {
            case 'center':
                positionMobile = 'top-50 start-50 translate-middle';
                break;

            case 'top center':
                positionMobile = 'top-0 start-50 translate-middle-x';
                break;

            case 'top left':
                positionMobile = 'top-0 start-0';
                break;

            case 'top right':
                positionMobile = 'top-0 end-0';
                break;

            case 'center left':
                positionMobile = 'top-50 start-0 translate-middle-y';
                break;

            case 'center center':
                positionMobile = 'top-50 start-50 translate-middle';
                break;

            case 'center right':
                positionMobile = 'top-50 end-0 translate-middle-y';
                break;

            case 'bottom left':
                positionMobile = 'bottom-0 start-0';
                break;

            case 'bottom center':
                positionMobile = 'bottom-0 start-50 translate-middle-x';
                break;

            case 'bottom right':
                positionMobile = 'bottom-0 end-0';
                break;
        }

        setAttributes({
            mobilePosition: positionMobile
        })
    }

    const setBackgroundColor = value => {
        setAttributes({
            backgroundColor: value
        })
    }

    return (
        <div {...useBlockProps()}>
            <BlockControls>
                {mobileView ? <ToolbarGroup>
                    <IconPickerToolbarButton value={icon} onChange={setIcon} />
                </ToolbarGroup> : null}
            </BlockControls>
            <InspectorControls>
                <Panel>
                    <PanelHeader>
                        Link Block Component for your own good
                    </PanelHeader>
                    <PanelBody title={__('Fixed Component Setting', 'sage')} initialOpen={true}>
                        <PanelRow>
                            <ToggleControl
                                label={__('Toggle Mobile View?', 'sage')}
                                value={mobileView}
                                onChange={(val) => setMobileViewValue(val)}
                            />
                        </PanelRow>
                        {mobileView ? <PanelRow>
                            <AlignmentMatrixControl
                                value={mobilePosition}
                                onChange={setMobilePosition}
                            />
                        </PanelRow> : null}
                        {mobileView ? <PanelRow>
                            <IconPicker label={__('Icon:', 'sage')} value={icon} onChange={(val) => setIcon({
                                    name: val.name,
                                    iconSet: val.iconSet,
                                    source: val.source
                            })} />
                        </PanelRow> : null}
                        {mobileView ? <PanelRow>
                            <Placeholder label={__('Icon Color', 'sage')} icon={labelColor}>
                                <ColorPalette
                                    colors={colorPalette}
                                    enableAlpha={true}
                                    value={backgroundColor}
                                    onChange={(val) => setBackgroundColor(val)}
                                />
                            </Placeholder>
                        </PanelRow> : null}
                        {mobileView ? <PanelRow>
                            <UnitControl
                                label={__("Mobile Icon Size", "sage")}
                                labelPosition="top"
                                onChange={(val) => setSize(val)}
                                value={size}
                            />
                        </PanelRow> : null}
                        {mobileView ? <PanelRow>
                            <Placeholder label={__('Container Padding Setting')} icon={settings}>
                                <BoxControl
                                    label={__('Padding', 'sage')}
                                    values={paddingIcon}
                                    resetValues={{
                                        top: '22px',
                                        right: '22px',
                                        bottom: '22px',
                                        left: '22px'
                                    }}
                                    onChange={(val) => setPaddingIcon(val)}
                                />
                            </Placeholder>
                        </PanelRow>: null}
                        {mobileView && <PanelRow>
                            <Placeholder label={__('Border Style Control:', 'sage')} icon={iconBorder}>
                                <BorderBoxControl
                                    label={__('Border Style:', 'sage')}
                                    value={border}
                                    onChange={(val) => setBorders(val)}
                                />
                            </Placeholder>
                        </PanelRow>}
                        {mobileView && <PanelRow>
                            <Placeholder label={__('Border Radius Style Control:', 'sage')} icon={iconBorder}>
                                <BoxControl
                                    values={borderRadius}
                                    onChange={(val) => setBorderRadius(val)}
                                />
                            </Placeholder>
                        </PanelRow>}
                    </PanelBody>
                </Panel>
            </InspectorControls>
            <div className={'fixed-mobile-container position-absolute d-none d-block d-md-none ' + (mobilePosition && mobilePosition.length > 0 ? mobilePosition : '')} style={{
                display: mobileView ? 'inline-flex' : 'none',
                backgroundColor: backgroundColor,
                padding: paddingIcon.top + ' ' + paddingIcon.right + ' ' + paddingIcon.bottom + ' ' + paddingIcon.left,
                border: border && Object.values(border).length > 0 ? Object.values(border).join(' ') : null,
                borderTopLeftRadius: borderRadius && borderRadius.left,
                borderTopRightRadius: borderRadius && borderRadius.top,
                borderBottomLeftRadius: borderRadius &&  borderRadius.right,
                borderBottomRightRadius: borderRadius &&  borderRadius.bottom
            }}>
                <InlineIconPicker value={icon} onChange={(val) => setIcon({
                        name: val.name,
                        iconSet: val.iconSet,
                        source: val.source
                })} className="icon-preview" style={{
                    width: size ? size : null,
                    height: size ? size : null,
                }}/>
            </div>
            <div className='fixed-component-container fixed-bottom' style={{
                border,
                display: mobileView ? 'none' : 'block'
            }}>
                <InnerBlocks />
            </div>
        </div >
    );
}