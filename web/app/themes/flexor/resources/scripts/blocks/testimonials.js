/**
 * Custom Image Blocks Tutorial
 * 
 * @see https://www.youtube.com/watch?v=WxAGNN-xtwc
 * @package https://github.com/10up/block-components
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

// import {  } from '@wordpress/blocks';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, InspectorAdvancedControls } from '@wordpress/block-editor';

import { Image } from '@10up/block-components';

/**
 * Wordpress Block's Component
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/components
 */
import { __experimentalNumberControl as NumberControl, PanelBody, PanelRow, Panel, Button, TextControl, ColorPalette, PanelHeader, Placeholder, TextareaControl } from '@wordpress/components';

import { useState, useEffect, useCallback } from '@wordpress/element';
import { color, image } from '@wordpress/icons';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useSelect } from '@wordpress/data';

// Import Swiper styles
import 'swiper/css/bundle';

// Get custom AttachmentImage component to display
import AttachmentImage from './getImage';

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

    const { clients, classNames, styles } = attributes;

    const [ total, setTotal ] = useState(clients.length);

    const colorPalette = useSelect('core/block-editor').getSettings().colors;

    const setTotalClient = useCallback((val) => {
        setTotal(val)
        if(clients.length > val) {
            removeTotalClient(val);
        } else {
            var differences = val - clients.length;
            [...Array(differences)].forEach((_, i) => {
                return setAttributes({
                    clients: [...clients, {
                        image: null,
                        alt: '',
                        name: '',
                        star: 0,
                        description: ''
                    }]
                })
            })
        }
    });

    const removeTotalClient = useCallback((val) => {
        setAttributes({
            clients: clients.splice(0, val)
        })
    })

    const setImage = useCallback((image, i) => {
        setAttributes({
            clients: clients.map((val, iImage) => {
                if (i === iImage) {
                    val['image'] = parseInt(image.id);
                    val['alt'] = image.alt;
                }
                return val;
            })
        });
    })

    const removeImage = useCallback((id, index) => {
        setAttributes({
            clients: clients.map((val, i) => {
                if (id === val['image']) {
                    val['image'] = null;
                }
                return val;
            }),
        });
    })

    const setName = useCallback((str, i) => {
        setAttributes({
            clients: clients.map((val, iClient) => {
                if(i === iClient){
                    val['name'] = str;
                };
                return val;
            })
        })
    })

    const setRole = useCallback((str, i) => {
        setAttributes({
            clients: clients.map((val, iClient) => {
                if(i === iClient){
                    val['role'] = str;
                };
                return val;
            })
        })
    })

    const setStar = useCallback((int, i) => {
        setAttributes({
            clients: clients.map((val, iClient) => {
                if(i === iClient){
                    val['star'] = parseInt(int);
                };
                return val;
            })
        })
    })

    const setDescription = useCallback((str, i) => {
        setAttributes({
            clients: clients.map((val, iClient) => {
                if (i === iClient) {
                    val['description'] = str;
                };
                return val;
            })
        })
    })

    const setClassNames = useCallback((str) => {
        setAttributes({
            classNames: str
        })
    })

    const setStyles = useCallback((obj) => {
        setAttributes({
            styles: {
                ...obj
            }
        })
    })

    return (
        <section {...useBlockProps({
            className: "testimonials section"
        })}>
            <InspectorControls>
                <Panel>
                    <PanelHeader>
                        Testimonial Block to add your client's testimonial
                    </PanelHeader>
                    <PanelBody title='Testimonial Settings' initialOpen={true}>
                        <PanelRow>
                            <NumberControl
                                label={__("Total Client\'s Testimonial(s)", "sage")}
                                isShiftStepEnabled={true}
                                onChange={setTotalClient}
                                spinControls='custom'
                                shiftStep={2}
                                min={0}
                                value={total}
                                help={__('Once set, you must set all client\'s info below listed in tabs. Use "+" & "-" button to increase/decrease client\'s testimonial(s)','sage')}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl 
                                label={__('Additional Class(es) for your container')}
                                help={__('You can put AOS animation classname such as "data-aos_fade-up" and other aos attributes', 'sage')}
                                value={classNames}
                                onChange={(val) => setClassNames(val)}
                            />
                        </PanelRow>
                    </PanelBody>
                    {clients.map((client, i) => {
                        return (
                            <PanelBody key={i + "-total-client"} title={'Client ' + (i + 1)} initialOpen={false}>
                                <PanelRow>
                                    <Placeholder label={__('Client\'s Image', 'sage')} icon={image} instructions={__('Image Size Recommended: 100x100', 'sage')}>
                                    <Image
                                        labels={{
                                            title: __('Select Client ' + (i + 1) + ' Image ', 'sage'),
                                            instructions: __('Upload an image or pick one from your media library.', 'sage')
                                        }}
                                        size='testimonial'
                                        id={client.image}
                                        canEditImage={true}
                                        onSelect={(image) => setImage(image, i)}
                                    />
                                    {typeof client.image === 'number' &&
                                        <Button variant='link' isDestructive onClick={(e) => removeImage(clients[i].image, i)}>{__('Remove Client ' + i + ' Image', 'sage')}</Button>
                                    }
                                    </Placeholder>
                                </PanelRow>
                                <PanelRow>
                                    <TextControl
                                        label={__('Client Name', 'sage')}
                                        value={client.name}
                                        onChange={(val) => setName(val, i)}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <TextControl
                                        label={__('Client\'s Role', 'sage')}
                                        value={client.role}
                                        onChange={(val) => setRole(val, i)}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <NumberControl
                                        label={__('Client Rank', 'sage')}
                                        value={client.star}
                                        isShiftStepEnabled={false}
                                        min={0}
                                        max={5}
                                        onChange={(val) => setStar(val, i)}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <TextareaControl
                                        label={__('Client\'s Testimonial', 'sage')}
                                        value={client.description}
                                        onChange={(val) => setDescription(val, i)}
                                        rows={8}
                                        help={__('This will help your site gain more trust & credibility!')}
                                    />
                                </PanelRow>
                            </PanelBody>
                        )
                    })}
                </Panel>
            </InspectorControls>
            <InspectorAdvancedControls>
                <PanelRow>
                    <Placeholder label={__('Name Color', 'sage')} icon={color}>
                        <ColorPalette
                            colors={colorPalette}
                            enableAlpha={true}
                            value={styles?.nameColor}
                            onChange={(val) => setStyles({
                                nameColor: val
                            })}
                        />
                    </Placeholder>
                </PanelRow>
                <PanelRow>
                    <Placeholder label={__('Role Color', 'sage')} icon={color}>
                        <ColorPalette
                            colors={colorPalette}
                            enableAlpha={true}
                            value={styles?.roleColor}
                            onChange={(val) => setStyles({
                                roleColor: val
                            })}
                        />
                    </Placeholder>
                </PanelRow>
                <PanelRow>
                    <Placeholder label={__('Star Color', 'sage')} icon={color}>
                        <ColorPalette
                            colors={colorPalette}
                            enableAlpha={true}
                            value={styles?.starColor}
                            onChange={(val) => setStyles({
                                starColor: val
                            })}
                        />
                    </Placeholder>
                </PanelRow>
                <PanelRow>
                    <Placeholder label={__('Quote Color', 'sage')} icon={color}>
                        <ColorPalette
                            colors={colorPalette}
                            enableAlpha={true}
                            value={styles?.quoteColor}
                            onChange={(val) => setStyles({
                                quoteColor: val
                            })}
                        />
                    </Placeholder>
                </PanelRow>
                <PanelRow>
                    <Placeholder label={__('Description Color', 'sage')} icon={color}>
                        <ColorPalette
                            colors={colorPalette}
                            enableAlpha={true}
                            value={styles?.descriptionColor}
                            onChange={(val) => setStyles({
                                descriptionColor: val
                            })}
                        />
                    </Placeholder>
                </PanelRow>
            </InspectorAdvancedControls>
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                {
                    clients.length > 0 && <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
                        loop={false}
                        speed={600}
                        slidesPerView={"auto"}
                        pagination={{
                            type: 'bullets',
                            clickable: true,
                            el: "swiper-pagination"
                        }}
                    >
                        {clients.map((client, i) => {
                            return (
                                <SwiperSlide className={'swiper-slide'} key={i + "Swiper"}>
                                    <div className={'testimonial-item'}>
                                        <AttachmentImage imageId={client.image} size='testimonial' key={i + '-image-testimonial'} className='testimonial-img' />
                                        {client.name && <h3>{client.name}</h3>}
                                        {client.role && <h4>{client.role}</h4>}
                                        {client.star > 0 && 
                                        <div className='stars'>
                                            {
                                                [...Array(client.star)].map((val, iStar) => {
                                                    return (
                                                        <i key={iStar + ' star'} className={'bi bi-star-fill'}></i>
                                                    )
                                                })
                                            }
                                        </div>}
                                        {client.description && 
                                            <p>
                                                <i className="bi bi-quote quote-icon-left"></i>
                                                <span>{client.description}</span>
                                                <i className="bi bi-quote quote-icon-right"></i>
                                            </p>
                                        }
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                }
            </div>
        </section>
    );
}
