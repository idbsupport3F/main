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
    PanelBody, PanelRow, Panel, Placeholder, __experimentalBorderBoxControl as BorderBoxControl, __experimentalBoxControl as BoxControl,
    __experimentalUnitControl as UnitControl,
    __experimentalAlignmentMatrixControl as AlignmentMatrixControl,
    ToggleControl,
    ColorPalette,
    ToolbarGroup,
    TextControl
} from '@wordpress/components';

import { border as iconBorder, color as labelColor, settings, grid as gridIcon, fullscreen as fullscreenIcon } from '@wordpress/icons';


import { useState, useEffect } from '@wordpress/element';

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

    const { mobilePosition, icon, border, borderRadius, iconColor, backgroundIconColor, paddingIcon, size, title, marginMobile } = attributes;

    const [ mobileView, setMobileView ] = useState(false);
    const [ mobilePos, setMobilePos ] = useState({});

    const colorPalette = useSelect('core/block-editor').getSettings().colors;

    useEffect(() => {
        setMobilePosition(mobilePosition)
    }, [])

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

    const setMarginMobile = value => {
        setAttributes({
            marginMobile: value
        })
    }

    const setMobilePosition = value => {
        switch (value) {
            case 'center':
                setMobilePos({
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%) !important"
                });
                break;

            case 'top center':
                setMobilePos({
                    top: "0",
                    left: "50%",
                    transform: "translateX(-50%) !important"
                });
                break;

            case 'top left':
                setMobilePos({
                    top: "0",
                    left: "0"
                });
                break;

            case 'top right':
                setMobilePos({
                    top: "0",
                    right: "0",
                });
                break;

            case 'center left':
                setMobilePos({
                    top: "50%",
                    left: "0",
                    transform: "translateY(-50%) !important"
                });
                break;

            case 'center center':
                setMobilePos({
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%) !important"
                });
                break;

            case 'center right':
                setMobilePos({
                    top: "50%",
                    right: "0",
                    transform: "translateY(-50%) !important"
                });
                break;

            case 'bottom left':
                setMobilePos({
                    bottom: "0",
                    left: "0"
                });
                break;

            case 'bottom center':
                setMobilePos({
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%) !important"
                });
                break;

            case 'bottom right':
                setMobilePos({
                    bottom: "0",
                    right: "0"
                });
                break;
        }

        setAttributes({
            mobilePosition: value
        })
    }

    const setBackgroundIconColor = value => {
        setAttributes({
            backgroundIconColor: value
        })
    }

    const setIconColor = value => {
        setAttributes({
            iconColor: value
        })
    }

    const setTitle = value => {
        setAttributes({
            title: value
        })
    }

    return (
        <React.Fragment {...useBlockProps()}>
            <BlockControls>
                {mobileView ? <ToolbarGroup>
                    <IconPickerToolbarButton value={icon} onChange={setIcon} />
                </ToolbarGroup> : null}
            </BlockControls>
            <InspectorControls>
                <Panel>
                    <PanelBody title={__('Fixed Component Setting', 'sage')} initialOpen={true}>
                        <PanelRow>
                            <TextControl
                                label={__('Title:', 'sage')}
                                type='text'
                                help={__('This title will reflect in mobile responsive view.')}
                                value={title}
                                onChange={setTitle}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={__('Toggle Mobile View?', 'sage')}
                                checked={mobileView}
                                onChange={setMobileView}
                            />
                        </PanelRow>
                    </PanelBody>
                    {mobileView &&
                        <PanelBody title={__('Mobile Settings', 'sage')}>
                            <PanelRow>
                                <IconPicker label={__('Choose Icon:', 'sage')} value={icon} onChange={(val) => setIcon({
                                    name: val.name,
                                    iconSet: val.iconSet,
                                    source: val.source
                                })} />
                            </PanelRow>
                            <PanelRow>
                                <Placeholder
                                    icon={gridIcon} 
                                    label={__('Button Position', 'sage')}
                                    instructions={__('Press any square position here to place your round fixed button.', 'sage')}
                                >
                                <AlignmentMatrixControl
                                    value={mobilePosition}
                                    onChange={setMobilePosition}
                                />
                                </Placeholder>
                            </PanelRow>
                            <PanelRow>
                                <Placeholder label={__('Icon Color', 'sage')} icon={labelColor}>
                                    <ColorPalette
                                        colors={colorPalette}
                                        enableAlpha={true}
                                        value={iconColor}
                                        onChange={(val) => setIconColor(val)}
                                    />
                                </Placeholder>
                            </PanelRow>
                            <PanelRow>
                                <Placeholder label={__('Background Icon Color', 'sage')} icon={labelColor}>
                                    <ColorPalette
                                        colors={colorPalette}
                                        enableAlpha={true}
                                        value={backgroundIconColor}
                                        onChange={(val) => setBackgroundIconColor(val)}
                                    />
                                </Placeholder>
                            </PanelRow>
                            <PanelRow>
                                <UnitControl
                                    label={__("Mobile Icon Size", "sage")}
                                    labelPosition="top"
                                    onChange={(val) => setSize(val)}
                                    value={size}
                                />
                            </PanelRow>
                            <PanelRow>
                                <Placeholder label={__('Padding Container')} icon={settings}>
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
                            </PanelRow>
                            <PanelRow>
                                <Placeholder label={__('Margin Container')} icon={fullscreenIcon}>
                                    <BoxControl
                                        label={__('Margin', 'sage')}
                                        values={marginMobile}
                                        resetValues={{
                                            top: '0px',
                                            right: '0px',
                                            bottom: '0px',
                                            left: '0px'
                                        }}
                                        onChange={(val) => setMarginMobile(val)}
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
                    }
                </Panel>
            </InspectorControls>
            <div className={'fixed-mobile-container'} ref={(node) => {
                if(node) {
                    node.style.setProperty('margin-top', marginMobile.top, 'important');
                    node.style.setProperty('margin-right', marginMobile.right, 'important');
                    node.style.setProperty('margin-left', marginMobile.left, 'important');
                    node.style.setProperty('margin-bottom', marginMobile.bottom, 'important');
                }
            }} style={{
                display: mobileView ? 'inline-flex' : 'none',
                position: 'fixed',
                ...mobilePos,
                backgroundColor: backgroundIconColor,
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
                    color: iconColor
                }}/>
            </div>
            <div {...useBlockProps({
                className: 'fixed-component-container fixed-bottom',
                style:{
                    border,
                    display: mobileView ? 'none' : 'block'
                }
            })}>
                <InnerBlocks />
            </div>
        </React.Fragment>
    );
}