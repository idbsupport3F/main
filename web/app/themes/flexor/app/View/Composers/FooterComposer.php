<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class FooterComposer extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var string[]
     */
    protected static $views = [
        'sections.footer'
    ];

    public function with(){
        return [
            'contact'       => $this->get_site_email(),
            'phone'         => $this->get_site_phone(),
            'title'         => $this->title(),
            'footer_image'  => $this->get_image_footer(),
            'social_medias' => $this->get_social_medias(),
            'address'       => $this->get_site_address()
        ];
    }

    /**
     * Retrieve the post title.
     *
     * @return string
     */
    public function title()
    {
        return get_bloginfo('name');
    }

    /**
     * Retrieve Site Email Settings
     * 
     * @return string
     */
    public function get_site_email()
    {
        if (get_theme_mod('site_email')) {
            return esc_attr(get_theme_mod('site_email'));
        }
        return null;
    }

    /**
     * Retrieve Site Phone Settings
     * 
     * @return string
     */
    public function get_site_phone()
    {
        if (get_theme_mod('site_phone')) {
            return esc_attr(get_theme_mod('site_phone'));
        }
        return null;
    }

    /**
     *  Check image if used
     *  @return string
     */
    public function get_image_footer()
    {
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
    public function get_social_medias()
    {
        $social_media = array();

        if (get_theme_mod('twitter-x')) {
            $social_media["twitter-x"] = esc_attr(get_theme_mod('twitter-x'));
        }

        if (get_theme_mod('facebook')) {
            $social_media["facebook"] = esc_attr(get_theme_mod('facebook'));
        }

        if (get_theme_mod('instagram')) {
            $social_media["instagram"] = esc_attr(get_theme_mod('instagram'));
        }

        if (get_theme_mod('linkedin')) {
            $social_media["linkedin"] = esc_attr(get_theme_mod('linkedin'));
        }

        return $social_media;
    }

    function get_site_address(){
        if(get_theme_mod('site_address')) {
            return esc_attr(get_theme_mod('site_address'));
        }

        return null;
    }
}
