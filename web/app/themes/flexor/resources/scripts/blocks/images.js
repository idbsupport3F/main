/**
 * Custom Image Blocks
 * 
 * @see https://www.youtube.com/watch?v=WxAGNN-xtwc
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {  } from '@wordpress/blocks';

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
import { __experimentalNumberControl as NumberControl, PanelBody, PanelHeader, PanelRow, Panel } from '@wordpress/components';

import { useState } from '@wordpress/element';

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

	const [state, setState] = useState(0);

	const setTotalImageNumber = function(val){
		setAttributes({ totalImage: val })
	}

	const setImage = function(image) {
		setAttributes( { images: [...images, { id: image.id, alt: image.alt }] })
	}

	const removeImage = function(image) {
		setAttributes({ 
			images: images.map((val, i) => {
				if(image.id === val) {
					return null;
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
							label="Total Client's Logo"
							isShiftStepEnabled={ true }
							onChange={ setTotalImageNumber }
							shiftStep={ 2 }
							min={0}
							value={ totalImage }
						/>
						</PanelRow>						
						{[...Array(totalImage).keys()].map((image, i) => {
							console.log(attributes)
							return (
								<PanelRow key={i}>
									<Image 
									isOptional
									label={"Logo" + (i + 1)}
									size='logo-client'
									key={i}
									id={image.id}
									canEditImage={true}
									onSelect={setImage}
								/>
								</PanelRow>
							)
						})}
					</PanelBody>
				</Panel>
			</InspectorControls>
			{images.map((image, i) => {
				<Image 
					key={image.id}
					id={image.id}
					size='logo-client'
				/>
			})}
		</div>
	);
}
