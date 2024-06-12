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

import { useState } from '@wordpress/element';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

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

	const { totalImage, images } = attributes;

	const setTotalImageNumber = function(val){
		if(images.length > val){
			removeImageCount(val);
		} else {
			setImage({ id: null, alt: ""}, val);
		}
		setAttributes({ totalImage: val })
	}

	const setImage = function(image, i) {
		if(image.id === null) {
			setAttributes({
				images: [...images, image]
			})
		} else {
			setAttributes({
				images: images.map((val, iImage) => {
					if(i === iImage) {
						val.id = image.id;
						val.alt = image.alt;
					}
					return val;
				})
			})
		}
	}

	const removeImageCount = function(val) {
		setAttributes({
			images: images.splice(0, val)
		})
	}

	const removeImage = function(id) {
		setAttributes({ 
			images: images.map((val, i) => {
				if(id === val.id) {
					return { id: null, alt: "" };
				}
				return val;
			}) 
		})
	}

	return (
		<div { ...useBlockProps() }>
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
						{images.map((image, i) => {
							console.log("Attributes: ",attributes)
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
										id={image.id}
										canEditImage={true}
										onSelect={(image) => setImage(image, i)}
									/>
									</PanelRow>
									<PanelRow>
										<Button variant='link' isDestructive onClick={(e) => removeImage(image.id)}>{__('Remove Logo Image ' + (i + 1), 'sage')}</Button>
									</PanelRow>
								</React.Fragment>
							)
						})}
					</PanelBody>
				</Panel>
			</InspectorControls>
			{images.length > 0 && <Swiper
				spaceBetween={50}
				slidesPerView={3}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
				>
				{images.map((image, i) => {
					<SwiperSlide key={i + "Swiper"}>
						<AttachmentImage imageId={image.id} size='logo-client' key={i + 'image'} />
					</SwiperSlide>
				})}
			</Swiper>}
		</div>
	);
}
