<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class SiteComposer extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var string[]
     */
    protected static $views = [
        'sections.header',
        'sections.footer',
        'sections.peperiksaan-footer'
    ];

    public function with()
    {
        return [
            'contact'       => $this->get_site_email(),
            'phone'         => $this->get_site_phone(),
            'pageTitle'     => $this->pageTitle(),
            'site_logo'     => $this->get_site_logo(),
            'social_medias' => $this->get_social_medias(),
            'address'       => $this->get_site_address()
        ];
    }

    /**
     * Retrieve the post title.
     *
     * @return string
     */
    static public function pageTitle()
    {

        if (is_home()) {
            if ($home = get_option('page_for_posts', true)) {
                return get_the_title($home);
            }

            return get_the_title();
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
    static public function get_site_email(){
        $pageTemplateFilter = is_page_template('template-peperiksaan.blade.php');
        if (get_theme_mod('site_email') && !$pageTemplateFilter) {
            return esc_attr(get_theme_mod('site_email'));
        } else if(get_theme_mod('site_email') && $pageTemplateFilter) {
            return esc_attr(get_theme_mod('peperiksaan_email'));
        }
        return null;
    }

    /**
     * Retrieve Site Phone Settings
     * 
     * @return string
     */
    static public function get_site_phone(){
        $pageTemplateFilter = is_page_template('template-peperiksaan.blade.php');
        if (get_theme_mod('site_phone') && !$pageTemplateFilter) {
            return [
                'phone' => esc_attr(get_theme_mod('site_phone')),
            ];
        } else if(get_theme_mod('site_phone') && $pageTemplateFilter) {
            return [
                'phone' => esc_attr(get_theme_mod('peperiksaan_phone')),
                'fax' => esc_attr(get_theme_mod('peperiksaan_fax')),
            ];
        }
        return null;
    }

    /**
     *  Check image if used
     *  @return string
     */
    static public function get_site_logo(){
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
    static public function get_social_medias(){
        $social_media = array();

        if(get_theme_mod('facebook')){
            $social_media["facebook"] = esc_attr(get_theme_mod('facebook'));
        }

        if (get_theme_mod('twitter-x')) {
            $social_media["twitter-x"] = esc_attr(get_theme_mod('twitter-x'));
        }

        if(get_theme_mod('instagram')){
            $social_media["instagram"] = esc_attr(get_theme_mod('instagram'));
        }

        if(get_theme_mod('youtube')){
            $social_media["youtube"] = esc_attr(get_theme_mod('youtube'));
        }

        if(get_theme_mod('youtube')){
            $social_media["tiktok"] = esc_attr(get_theme_mod('tiktok'));
        }

        return $social_media;
    }

    static public function get_site_address()
    {
        if (get_theme_mod('site_address')) {
            return esc_attr(get_theme_mod('site_address'));
        }

        return null;
    }

}
