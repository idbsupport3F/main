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
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';

import { Image, MediaToolbar } from '@10up/block-components';

/**
 * Wordpress Block's Component
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/components
 */
import { __experimentalNumberControl as NumberControl, PanelBody, PanelHeader, PanelRow, Panel, Button } from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

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

	const { totalImage, images, imagesAlt } = attributes;

	const [ tempImages, setTempImages ] = useState([]);

	// useEffect(()=>{
	// 	images.forEach((val, index) => {
	// 		setImage({
	// 			id: val.id,
	// 			alt: 
	// 		})
	// 	})
	// }, [images])

	const setTotalImageNumber = function(val){
		if(images.length > val){
			removeImageCount(val);
		} else {
			setImage(null, val);
		}
		setAttributes({ totalImage: parseInt(val) })
	}

	const setImage = function(imageId, i) {
		if(imageId === null) {
			setAttributes({
				images: [...images, imageId],
				imagesAlt: [...imagesAlt, '']
			})
		} else {
			setAttributes({
				images: images.map((val, iImage) => {
					if(i === iImage) {
						val = parseInt(imageId.id);
					}
					return val;
				}),
				imagesAlt: imagesAlt.map((val, iAlt) => iAlt === i && imageId.alt ? imageId.alt : val )
			});
			setTempImages([...tempImages, {
				url: imageId.url,
				alt: imageId.alt
			}]);
		}
	}

	const removeImageCount = function(val) {
		setAttributes({
			images: images.splice(0, val),
			imagesAlt: imagesAlt.splice(0, val)
		})
		setTempImages(prevAlts => {
			return prevAlts.splice(0, val)
		});
	}

	const removeImage = function(id, index) {
		setAttributes({ 
			images: images.map((val, i) => {
				if(id === val) {
					return null;
				}
				return val;
			}),
			imagesAlt: imagesAlt.map((val, iAlt) => iAlt === index ? '' : val )
		})
		setTempImages(prevAlts => {
			return prevAlts.filter((val, i) => i !== index)
		})
	}

	return (
		<section { ...useBlockProps({
			className: "clients section"
		}) }>
			<InspectorControls>
				<Panel>
					<PanelBody title='Logo Images'>
						<PanelRow>
						<NumberControl
							label={__("Total Client's Logo", "sage")}
							isShiftStepEnabled={ true }
							onChange={ setTotalImageNumber }
							shiftStep={ 2 }
							min={0}
							value={ totalImage }
						/>
						</PanelRow>						
						{images.map((id, i) => {
							return (
								<React.Fragment key={i + "Images"}>
									<PanelRow>
										<Image 
										labels={{
											title: __('Select Logo Image ' + (i + 1), 'sage'),
											instructions: __('Upload an image or pick one from your media library.', 'sage')
										}}
										size='logo-client'
										key={i}
										id={id}
										canEditImage={true}
										onSelect={(image) => setImage(image, i)}
									/>
									</PanelRow>
									<PanelRow>
										<Button variant='link' isDestructive onClick={(e) => removeImage(id, i)}>{__('Remove Logo Image ' + (i + 1), 'sage')}</Button>
									</PanelRow>
								</React.Fragment>
							)
						})}
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className="container" data-aos="fade-up" data-aos-delay="100">
				{
					images.length > 0 && <Swiper
						wrapperClass='align-items-center'
						spaceBetween={50}
						loop={true}
						speed={600}
						autoplay={{
							delay:600
						}}
						slidesPerView={"auto"}
						pagination={{
							type:'bullets',
							clickable: true,
							el: "swiper-pagination"
						}}
						breakpoints={{
							320: {
								slidesPerView: 2,
								spaceBetween: 40
							},
							480: {
								slidesPerView: 3,
								spaceBetween: 60
							},
							640: {
								slidesPerView: 4,
								spaceBetween: 80
							},
							992: {
								slidesPerView:6,
								spaceBetween: 120
							}
						}}
						>
							{images.map((image, i) => {
								return (
									<SwiperSlide className={'swiper-slide'} key={i + "Swiper"}>
										<AttachmentImage imageId={image} size='logo-client' key={i + 'image'} />
									</SwiperSlide>
								)
							})}
					</Swiper>
				}
			</div>
		</section>
	);
}
