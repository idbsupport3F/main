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
 * Wordpress Block's Component
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/components
 */
import { __experimentalNumberControl as NumberControl, PanelBody, PanelRow, Panel, PanelHeader, TextControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

/**
 * Custom Block Components to grab IconPicker component
 * 
 * @see https://github.com/10up/block-components/tree/develop/components/icon-picker
 */

import {
    InlineIconPicker,
    IconPicker,
    useIcon,
} from '@10up/block-components';

import { useCallback, useEffect } from '@wordpress/element';

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

    const { faq } = attributes;

    const icon = useIcon('sage/bootstrap-icons', 'chevron-right');

    useEffect(() => {
        setAttributes({
            faq: Object.keys(faq).length > 0 ? faq : {
                icon: {
                    name: '',
                    iconSet: '',
                    source: ''
                },
                classNames: '',
                title: ''
            }
        })
    }, [faq])

    const setFaq = useCallback((newVal) => {
        setAttributes({
            faq: {
                icon: newVal.icon ? {
                    name: newVal.icon.name ? newVal.icon.name : faq.icon.name,
                    iconSet: newVal.icon.iconSet ? newVal.icon.iconSet : faq.icon.iconSet,
                    source: newVal.icon.source ? newVal.icon.source : faq.icon.source,
                    size: newVal.icon.size ? newVal.icon.size : faq.icon.size
                } : faq.icon,
                title: newVal.title ? newVal.title : faq.title
            }
        })
    }, [faq]);

    return (
        <div {...useBlockProps({
            className: 'faq-container'
        })}>
            <InspectorControls>
                <Panel>
                    <PanelHeader>
                        FAQ Block for your visitors
                    </PanelHeader>
                    <PanelBody title={__('FAQ Info', 'sage')} initialOpen={true}>
                        <PanelRow>
                            <IconPicker label={__('Icon:', 'sage')} value={faq.icon} onChange={(val) => setFaq({
                                icon: {
                                    name: val.name,
                                    iconSet: val.iconSet,
                                    source: val.source
                                }
                            })} />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('FAQ Title', 'sage')}
                                value={faq.title}
                                onChange={(val) => setFaq({
                                    title: val
                                })}
                            />
                        </PanelRow>
                    </PanelBody>
                </Panel>
            </InspectorControls>
            <div className={['faq-item', 'faq-active'].join(' ')}>
                <InlineIconPicker value={faq.icon} onChange={(val) => setFaq({
                    icon: {
                        name: val.name,
                        iconSet: val.iconSet,
                        source: val.source
                    }
                }, i)} className="icon-preview faq-icon" />
                <h3>{faq.title}</h3>
                <div className="faq-content">
                    <InnerBlocks />
                </div>
                <div
                    style={{
                        width: '16px',
                        height: '16px'
                    }}
                    className='faq-toggle'
                    dangerouslySetInnerHTML={{
                        __html: icon.source
                    }}
                />
            </div>
        </div>
    );
}
