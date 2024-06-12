/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import { PanelBody, Button, ResponsiveWrapper, Spinner } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { more } from '@wordpress/icons';

/**
 * The Image Function to attach multiple images components
 *
 * @see https://www.liip.ch/en/blog/add-an-image-selector-to-a-gutenberg-block
 *
 * @return {Element} Element to render.
 */

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class Edit extends Component {
    render() {
        const { attributes, setAttributes, bgImage, className } = this.props;
        const { bgImageId } = attributes;
        const instructions = <p>{ __( 'To edit the background image, you need permission to upload media.', 'image-selector-example' ) }</p>;

        let styles = {};
        if ( bgImage && bgImage.source_url ) {
            styles = { backgroundImage: `url(${ bgImage.source_url })` };
        }

        const onUpdateImage = ( image ) => {
            setAttributes( {
                bgImageId: image.id,
            } );
        };

        const onRemoveImage = () => {
            setAttributes( {
                bgImageId: undefined,
            } );
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
                        title={ __( 'Background settings', 'image-selector-example' ) }
                        initialOpen={ true }
                    >
                        <div className="wp-block-image-selector-example-image">
                            <MediaUploadCheck fallback={ instructions }>
                                <MediaUpload
                                    title={ __( 'Background image', 'image-selector-example' ) }
                                    onSelect={ onUpdateImage }
                                    allowedTypes={ ALLOWED_MEDIA_TYPES }
                                    value={ bgImageId }
                                    render={ ( { open } ) => (
                                        <Button
                                            className={ ! bgImageId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
                                            onClick={ open }>
                                            { ! bgImageId && ( __( 'Set background image', 'image-selector-example' ) ) }
                                            { !! bgImageId && ! bgImage && <Spinner /> }
                                            { !! bgImageId && bgImage &&
                                                <ResponsiveWrapper
                                                    naturalWidth={ bgImage.media_details.width }
                                                    naturalHeight={ bgImage.media_details.height }
                                                >
                                                    <img src={ bgImage.source_url } alt={ __( 'Background image', 'image-selector-example' ) } />
                                                </ResponsiveWrapper>
                                            }
                                        </Button>
                                    ) }
                                />
                            </MediaUploadCheck>
                            { !! bgImageId && bgImage &&
                                <MediaUploadCheck>
                                    <MediaUpload
                                        title={ __( 'Background image', 'image-selector-example' ) }
                                        onSelect={ onUpdateImage }
                                        allowedTypes={ ALLOWED_MEDIA_TYPES }
                                        value={ bgImageId }
                                        render={ ( { open } ) => (
                                            <Button onClick={ open }>
                                                { __( 'Replace background image', 'image-selector-example' ) }
                                            </Button>
                                        ) }
                                    />
                                </MediaUploadCheck>
                            }
                            { !! bgImageId &&
                                <MediaUploadCheck>
                                    <Button onClick={ onRemoveImage } isLink isDestructive>
                                        { __( 'Remove background image', 'image-selector-example' ) }
                                    </Button>
                                </MediaUploadCheck>
                            }
                        </div>
                    </PanelBody>
                </InspectorControls>
                <div
                    className={ className }
                    style={ styles }
                >
                    <InnerBlocks />
                </div>
            </Fragment>
        );
    }
}

export default compose(
	withSelect( ( select, props ) => {
		const { getMedia } = select( 'core' );
		const { bgImageId } = props.attributes;

		return {
			bgImage: bgImageId ? getMedia( bgImageId ) : null,
		};
	} ),
)( Edit );