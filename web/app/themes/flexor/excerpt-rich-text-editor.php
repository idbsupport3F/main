<?php

/**
 * Replaces the default excerpt editor with TinyMCE.
 */
add_action("add_meta_boxes", ["T5_Richtext_Excerpt", "switch_boxes"]);


if (!class_exists('T5_Richtext_Excerpt')) :

    class T5_Richtext_Excerpt
    {
        /**
         * Replaces the meta boxes.
         *
         * @return void
         */
        public static function switch_boxes()
        {
            if (!post_type_supports($GLOBALS["post"]->post_type, "excerpt")) {
                return;
            }

            remove_meta_box(
                "postexcerpt", // ID
                "", // Screen, empty to support all post types
                "normal" // Context
            );

            add_meta_box(
                "postexcerpt2", // Reusing just 'postexcerpt' doesn't work.
                __("Excerpt"), // Title
                [__CLASS__, "show"], // Display function
                null, // Screen, we use all screens with meta boxes.
                "normal", // Context
                "core" // Priority
            );
        }

        /**
         * Output for the meta box.
         *
         * @param  object $post
         * @return void
         */
        public static function show($post)
        {
?>
            <label class="screen-reader-text" for="excerpt"><?php _e(
                                                                "Excerpt"
                                                            ); ?></label>
<?php // We use the default name, 'excerpt', so we don’t have to care about
            // saving, other filters etc.
            wp_editor(self::unescape($post->post_excerpt), "excerpt", [
                "textarea_rows" => 15,
                "media_buttons" => false,
                "teeny" => true,
                "tinymce" => true,
            ]);
        }

        /**
         * The excerpt is escaped usually. This breaks the HTML editor.
         *
         * @param  string $str
         * @return string
         */
        public static function unescape($str)
        {
            return str_replace(
                ["&lt;", "&gt;", "&quot;", "&amp;", "&nbsp;", "&amp;nbsp;"],
                ["<", ">", '"', "&", " ", " "],
                $str
            );
        }
    }
endif;

/**
 * Issue on Wordpress 6.3 and above where Excerpt cannot output HTML correctly from this forum (Temporary Solution): https://github.com/WordPress/gutenberg/issues/49449#issuecomment-2234224056
 * Add a filter on `pre_render_block` to determine if the excerpt is manual. If so, add a filter to `wp_trim_words` to handle formatting ourself.
 */

add_filter('pre_render_block', 'themeslug_pre_render_excerpt', 10, 3);

function themeslug_pre_render_excerpt(
    ?string $pre_render,
    array $block,
    ?WP_Block $parent_block
): ?string {
    if (
        'core/post-excerpt' === $block['blockName']
        && is_null($pre_render)
        && ! is_null($parent_block)
        && isset($parent_block->context['postId'])
        && has_excerpt($parent_block->context['postId'])
    ) {
        add_filter('wp_trim_words', 'themeslug_format_excerpt', 10, 4);
    }

    return $pre_render;
}

// Add a filter to Post Excerpt block to remove the filter we added earlier on
// the `wp_trim_words` hook.

add_filter('render_block_core/post-excerpt', 'themeslug_render_post_excerpt');

function themeslug_render_post_excerpt(string $content): string
{
    if ($priority = has_filter('wp_trim_words', 'themeslug_format_excerpt')) {
        remove_filter('wp_trim_words', 'themeslug_format_excerpt', $priority);
    }

    return $content;
}

// Used to filter `wp_trim_words` to allow manual excerpts to work, limiting to
// a subset of inline HTML tags.

function themeslug_format_excerpt(
    string $text,
    int $num_words,
    string $more,
    string $original_text
): string {
    return wp_kses_post($original_text);
}
