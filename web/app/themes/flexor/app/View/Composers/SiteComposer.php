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
            'siteLogo'      => $this->get_site_logo(),
            'socialMedias'  => $this->get_social_medias(),
            'address'       => $this->get_site_address(),
            'lat'           => $this->get_lat(),
            'long'           => $this->get_long()
        ];
    }

    /**
     * Retrieve the post title.
     *
     * @return string
     */
    public function pageTitle()
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
    public function get_site_email(){
        if (get_theme_mod('site_email') && !$this->is_peperiksaan()) {
            return esc_attr(get_theme_mod('site_email'));
        } else if(get_theme_mod('peperiksaan_email') && $this->is_peperiksaan()) {
            return esc_attr(get_theme_mod('peperiksaan_email'));
        }
        return null;
    }

    /**
     * Retrieve Site Phone Settings
     * 
     * @return array
     */
    public function get_site_phone(){
        if (get_theme_mod('site_phone') && !$this->is_peperiksaan()) {
            return [
                'phone' => esc_attr(get_theme_mod('site_phone')),
            ];
        } else if((get_theme_mod('peperiksaan_phone') || get_theme_mod('peperiksaan_fax') ) && $this->is_peperiksaan()) {
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
    public function get_site_logo(){
        $site_logo = array();

        if (get_theme_mod('site_logo')) {
            $site_logo['logo'] =
            esc_attr(get_theme_mod('site_logo'));
        }

        if(get_theme_mod('site_logo_height')) {
            $site_logo['height'] =
            esc_attr(get_theme_mod('site_logo_height'));
        }

        if(get_theme_mod('footer_logo_height')) {
            $site_logo['footer_logo_height'] = esc_attr(get_theme_mod('footer_logo_height'));
        }
        
        return $site_logo;
    }
    
    /**
     * Get All Social Medias Link
     * 
     * @return array[string]
     */
    public function get_social_medias(){
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

    /**
     * Get Site/Peperiksaan Address dynamically
     * 
     * @return string
     */
    public function get_site_address()
    {
        if (get_theme_mod('site_address') && !$this->is_peperiksaan()) {
            return esc_attr(get_theme_mod('site_address'));
        } else if (get_theme_mod('peperiksaan_address') && $this->is_peperiksaan()) {
            return esc_attr(get_theme_mod('peperiksaan_address'));
        }

        return null;
    }

    /**
     * Peperiksaan Checker
     * 
     * @return bool
     */
    static private function is_peperiksaan(){
        return is_page_template('template-peperiksaan.blade.php');
    }

    /**
     * Get Latitude
     * 
     * @return string
     */
    public function get_lat() {

        if (get_theme_mod('site_address') && !$this->is_peperiksaan()) {
            return $this->DECtoDMS(esc_attr(get_theme_mod('site_latitude')));
        } else if (get_theme_mod('peperiksaan_address') && $this->is_peperiksaan()) {
            return $this->DECtoDMS(esc_attr(get_theme_mod('peperiksaan_latitude')));
        }

        return null;
    }

    /**
     * Get Longitude
     * 
     * @return string
     */
    public function get_long() {

        if (get_theme_mod('site_address') && !$this->is_peperiksaan()) {
            return $this->DECtoDMS(esc_attr(get_theme_mod('site_longitude')));
        } else if (get_theme_mod('peperiksaan_address') && $this->is_peperiksaan()) {
            return $this->DECtoDMS(esc_attr(get_theme_mod('peperiksaan_longitude')));
        }

        return null;
    }

    private function DECtoDMS($dec)
    {

        // Converts decimal longitude / latitude to DMS
        // ( Degrees / minutes / seconds ) 

        // This is the piece of code which may appear to 
        // be inefficient, but to avoid issues with floating
        // point math we extract the integer part and the float
        // part by using a string function.

        if(empty($dec)) {
            return $dec;
        }

        $vars = explode(".", $dec);
        $deg = $vars[0];
        $tempma = "0." . $vars[1];

        $tempma = $tempma * 3600;
        $min = floor($tempma / 60);
        $sec = $tempma - ($min * 60);

        return array("deg" => $deg, "min" => $min, "sec" => $sec, "raw" => $dec);
    } 

    private function DMStoDEC($deg, $min, $sec)
    {

        // Converts DMS ( Degrees / minutes / seconds ) 
        // to decimal format longitude / latitude

        return $deg + ((($min * 60) + ($sec)) / 3600);
    }    

}
