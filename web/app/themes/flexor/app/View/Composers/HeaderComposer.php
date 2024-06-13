<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class HeaderComposer extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var string[]
     */
    protected static $views = [
        'sections.header'
    ];

    public function with()
    {
        return [
            'contact'       => $this->get_site_email(),
            'phone'         => $this->get_site_phone(),
            'title'         => $this->title(),
            'header_image'  => $this->get_image_header(),
            'social_medias' => $this->get_social_medias()
        ];
    }

    /**
     * Retrieve the post title.
     *
     * @return string
     */
    public function title()
    {

        if (is_home()) {
            if ($home = get_option('page_for_posts', true)) {
                return get_the_title($home);
            }

            return __('Latest Posts', 'sage');
        }

        if (is_archive()) {
            return get_the_archive_title();
        }

        if (is_search()) {
            return sprintf(
                /* translators: %s is replaced with the search query */
                __('Search Results for %s', 'sage'),
                get_search_query()
            );
        }

        if (is_404()) {
            return __('Not Found', 'sage');
        }

        return get_the_title();
    }

    /**
     * Retrieve Site Email Settings
     * 
     * @return string
     */
    public function get_site_email(){
        if (get_theme_mod('site_email')) {
            return esc_attr(get_theme_mod('site_email'));
        }
        return "contact@email.com";
    }

    /**
     * Retrieve Site Phone Settings
     * 
     * @return string
     */
    public function get_site_phone(){
        if (get_theme_mod('site_phone')) {
            return esc_attr(get_theme_mod('site_phone'));
        }
        return "1 5589 55488 55";
    }

    /**
     *  Check image if used
     *  @return string
     */
    public function get_image_header(){
        if (get_theme_mod('site_logo')) {
            return esc_attr(get_theme_mod('site_logo'));
        }
        return "";
    }
    
    /**
     * Get All Social Medias Link
     * 
     * @return array[string]
     */
    public function get_social_medias(){
        $social_media = array();

        if(get_theme_mod('twitter-x')){
            $social_media["twitter-x"] = esc_attr(get_theme_mod('twitter-x'));
        }

        if(get_theme_mod('facebook')){
            $social_media["facebook"] = esc_attr(get_theme_mod('facebook'));
        }

        if(get_theme_mod('instagram')){
            $social_media["instagram"] = esc_attr(get_theme_mod('instagram'));
        }

        if(get_theme_mod('linkedin')){
            $social_media["linkedin"] = esc_attr(get_theme_mod('linkedin'));
        }

        return $social_media;
    }

}
