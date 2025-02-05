<?php

#region # Bootstrap Menu
function menu_controller($wp_customize)
{
    $wp_customize->add_setting(
        'menu_depth',
        array(
            'default' => 3,
            'transport' => 'postMessage',
            'sanitize_callback' => 'skyrocket_sanitize_integer'
        )
    );

    // Get Existing Panel named 'nav_menus'
    $panel = $wp_customize->get_panel('nav_menus');

    #region Footer Settings
    if (array_key_exists('footer_navigation', get_nav_menu_locations()) && isset(get_nav_menu_locations()['footer_navigation'])) {
        $section = $wp_customize->get_section('nav_menu[' . get_nav_menu_locations()['footer_navigation'] . ']');

        if (isset($section)) {
            // Limit Footer Items
            $wp_customize->add_setting(
                'footer_navigation_limits',
                array(
                    'default' => 5,
                    'transport' => 'refresh',
                    'sanitize_callback' => 'skyrocket_sanitize_integer'
                )
            );

            $wp_customize->add_setting(
                'divider_footer_height',
                array(
                    'default' => '',
                    'transport' => 'postMessage',
                    'sanitize_callback' => ''
                )
            );

            // Notice
            $wp_customize->add_setting(
                'footer_styling_notice',
                array(
                    'default' => '',
                    'transport' => 'postMessage',
                    'sanitize_callback' => 'skyrocket_text_sanitization'
                )
            );

            $wp_customize->add_control(new Skyrocket_Divider_Custom_Control(
                $wp_customize,
                'divider_footer_height',
                array(
                    'section' => $section->id,
                    'input_attrs' => array(
                        'width' => 'full',
                        'type' => 'solid',
                        'margintop' => 30,
                        'marginbottom' => 15,
                    ),
                    'priority'  => 998
                )
            ));

            $wp_customize->add_control(new Skyrocket_Simple_Notice_Custom_control(
                $wp_customize,
                'footer_styling_notice',
                array(
                    'label' => __('Footer Styling', 'sage'),
                    'description' => __('You may adjust footer styles here to your liking. ', 'sage'),
                    'section' => $section->id
                )
            ));

            $wp_customize->add_control(
                new Skyrocket_Slider_Custom_Control(
                    $wp_customize,
                    'footer_navigation_limits',
                    array(
                        'label'         => __('Footer Navigation Link Limits:', 'sage'),
                        'section'       => $section->id,
                        'input_attrs'   => array(
                            'max'   => 10,
                            'min'   => 1,
                            'step'  => 1
                        ),
                        'priority'  => 998
                    )
                )
            );
        }
    }

    #region Menu Depth
    // Add Panel
    $wp_customize->add_panel('menu_depth_panel', array(
        'priority' => 12,
        'title' => 'Menu Depth',
        'description' => __('You can set the depth of your header menu items in this template', 'sage')
    ));

    // Add Custom Section for Menu Depth
    $wp_customize->add_section(
        'menu_depth_section',
        array(
            'title' => __('Adjust Depth', 'sage'),
            'description' => __('You may adjust the depth value of a page that appears in header. Maximum depth is 5, minimum allowed is 0. 0 means all.', 'sage'),
            'panel' =>  $panel->id,
        )
    );

    // Depth Number
    $wp_customize->add_control(
        new Skyrocket_Slider_Custom_Control(
            $wp_customize,
            'menu_depth',
            array(
                'label'         => __('Menu Depth:', 'sage'),
                'section'       => 'menu_depth_section',
                'input_attrs'   => array(
                    'min'   => 0,
                    'max'   => 5,
                    'step'  => 1
                )
            )
        )
    );
}
/**
 * Customize Global
 * 
 * @see https://developer.wordpress.org/reference/hooks/customize_register/
 */
#region # Site Info
function site_contact($wp_customize)
{
    // Panel
    $site_info_panel = $wp_customize->add_panel('all_site_info', array(
        'priority' => 1,
        'title' => __('Site Info', 'sage')
    ));

    //Sections
    $wp_customize->add_section(
        'main_info',
        array(
            'title' => __('Main Info', 'sage'),
            'priority' => 1,
            'description' => __('Main Info for your site', 'sage'),
            'panel' => $site_info_panel->id
        )
    );
    $wp_customize->add_section(
        'peperiksaan_info',
        array(
            'title' => __('Peperiksaan Info', 'sage'),
            'priority' => 2,
            'description' => __('Peperiksaan Info for your site', 'sage'),
            'panel' => $site_info_panel->id
        )
    );
    $wp_customize->add_section(
        'social_media',
        array(
            'title' => __('Social Media', 'sage'),
            'priority' => 2,
            'description' => __('Insert your social media links here', 'sage')
        )
    );
    $wp_customize->add_section(
        'site_settings',
        array(
            'title' => __('Site Settings', 'sage'),
            'priority' => 3,
            'description' => __('Settings for your site by simply turn on/off. Once you turn some of the settings on, it is best for you to <b>refresh the page again</b> and see this settings again for more configs.', 'sage'),
            'panel' => $site_info_panel->id
        )
    );

    // Settings
    $wp_customize->add_setting('site_email', array('default' => ''));
    $wp_customize->add_setting('peperiksaan_email', array('default' => ''));
    $wp_customize->add_setting('site_phone', array('default' => ''));
    $wp_customize->add_setting('peperiksaan_phone', array('default' => ''));
    $wp_customize->add_setting('peperiksaan_fax', array('default' => ''));
    $wp_customize->add_setting('site_logo', array('default' => ''));
    $wp_customize->add_setting('twitter-x', array('default' => ''));
    $wp_customize->add_setting('facebook', array('default' => ''));
    $wp_customize->add_setting('instagram', array('default' => ''));
    $wp_customize->add_setting('youtube', array('default' => ''));
    $wp_customize->add_setting('tiktok', array('default' => ''));
    $wp_customize->add_setting(
        'show_site_contacts',
        array(
            'default' => false,
            'transport' => 'refresh',
            'sanitize_callback' => 'skyrocket_switch_sanitization'
        )
    );
    $wp_customize->add_setting(
        'show_footer_logo_image',
        array(
            'default' => true,
            'transport' => 'refresh',
            'sanitize_callback' => 'skyrocket_switch_sanitization'
        )
    );
    $wp_customize->add_setting(
        'site_address',
        array(
            'default' => '',
            'transport' => 'postMessage',
            'sanitize_callback' => 'wp_kses_post'
        )
    );
    $wp_customize->add_setting(
        'site_latitude',
        array(
            'default' => ''
        )
    );
    $wp_customize->add_setting(
        'site_longitude',
        array(
            'default' => ''
        )
    );
    $wp_customize->add_setting(
        'peperiksaan_address',
        array(
            'default' => '',
            'transport' => 'postMessage',
            'sanitize_callback' => 'wp_kses_post'
        )
    );
    $wp_customize->add_setting(
        'peperiksaan_latitude',
        array(
            'default' => ''
        )
    );
    $wp_customize->add_setting(
        'peperiksaan_longitude',
        array(
            'default' => ''
        )
    );
    $wp_customize->add_setting(
        'show_site_name',
        array(
            'default' => false,
            'transport' => 'refresh',
            'sanitize_callback' => 'skyrocket_switch_sanitization'
        )
    );
    $wp_customize->add_setting(
        'hide_footer_site_name',
        array(
            'default' => false,
            'transport' => 'refresh',
            'sanitize_callback' => 'skyrocket_switch_sanitization'
        )
    );

    // Divider
    $wp_customize->add_setting(
        'divider_header_height',
        array(
            'default' => '',
            'transport' => 'postMessage',
            'sanitize_callback' => ''
        )
    );

    // Notice
    $wp_customize->add_setting(
        'header_styling_notice',
        array(
            'default' => '',
            'transport' => 'postMessage',
            'sanitize_callback' => 'skyrocket_text_sanitization'
        )
    );

    // Header Logo Height
    $wp_customize->add_setting(
        'site_logo_height',
        array(
            'default' => 40,
            'transport' => 'refresh',
            'sanitize_callback' => 'skyrocket_sanitize_integer'
        )
    );


    // Logo Height
    $wp_customize->add_setting(
        'footer_logo_height',
        array(
            'default' => 40,
            'transport' => 'refresh',
            'sanitize_callback' => 'skyrocket_sanitize_integer'
        )
    );

    // Controls
    // Show Site Contacts
    $wp_customize->add_control(
        new Skyrocket_Toggle_Switch_Custom_control(
            $wp_customize,
            'show_site_contacts',
            array(
                'label' => __('Hide header site contacts?', 'sage'),
                'section' => 'site_settings'
            )
        )
    );

    // Show Site Name
    $wp_customize->add_control(
        new Skyrocket_Toggle_Switch_Custom_control(
            $wp_customize,
            'show_site_name',
            array(
                'label' => __('Show site title?', 'sage'),
                'section' => 'site_settings'
            )
        )
    );

    // Hide Footer Site Name
    $wp_customize->add_control(
        new Skyrocket_Toggle_Switch_Custom_control(
            $wp_customize,
            'hide_footer_site_name',
            array(
                'label' => __('Show footer site title?', 'sage'),
                'section' => 'site_settings'
            )
        )
    );

    // Show Footer  Image
    $wp_customize->add_control(
        new Skyrocket_Toggle_Switch_Custom_control(
            $wp_customize,
            'show_footer_logo_image',
            array(
                'label' => __('Show footer image?', 'sage'),
                'section' => 'site_settings'
            )
        )
    );

    // Site Address
    $wp_customize->add_control(
        new Skyrocket_TinyMCE_Custom_control(
            $wp_customize,
            'site_address',
            array(
                'label' => __('Address', 'sage'),
                'description' => __('Type the site address location in here.', 'sage'),
                'section' => 'main_info',
                'input_attrs' => array(
                    'toolbar1' => 'bold italic bullist numlist alignleft aligncenter alignright link',
                    'toolbar2' => 'formatselect outdent indent | blockquote charmap',
                    'mediaButtons' => false,
                )
            )
        )
    );

    // Site Latitude
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'site_latitude',
            array(
                'label'     =>  __('Site Latitude:', 'sage'),
                'type'      =>  'number',
                'section'   =>  'main_info'
            )
        )
    );

    // Site Longitude
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'site_longitude',
            array(
                'label'     =>  __('Site Longitude:', 'sage'),
                'type'      =>  'number',
                'section'   =>  'main_info'
            )
        )
    );

    // Peperiksaan Address
    $wp_customize->add_control(
        new Skyrocket_TinyMCE_Custom_control(
            $wp_customize,
            'peperiksaan_address',
            array(
                'label' => __('Address', 'sage'),
                'description' => __('Type the peperiksaan address location in here.', 'sage'),
                'section' => 'peperiksaan_info',
                'input_attrs' => array(
                    'toolbar1' => 'bold italic bullist numlist alignleft aligncenter alignright link',
                    'toolbar2' => 'formatselect outdent indent | blockquote charmap',
                    'mediaButtons' => false,
                )
            )
        )
    );


    // Peperiksaan Latitude
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'peperiksaan_latitude',
            array(
                'label'     =>  __('Peperiksaan Latitude:', 'sage'),
                'type'      =>  'number',
                'section'   =>  'peperiksaan_info'
            )
        )
    );

    // Peperiksaan Longitude
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'peperiksaan_longitude',
            array(
                'label'     =>  __('Peperiksaan Longitude:', 'sage'),
                'type'      =>  'number',
                'section'   =>  'peperiksaan_info'
            )
        )
    );

    // Email Address
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'site_email',
            array(
                'label'     =>  __('Email Address:', 'sage'),
                'type'      =>  'email',
                'section'   =>  'main_info',
                'settings'  =>  'site_email'
            )
        )
    );

    // Peperiksaan Email Address
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'peperiksaan_email',
            array(
                'label'     =>  __('Email Address:', 'sage'),
                'type'      =>  'email',
                'section'   =>  'peperiksaan_info',
                'settings'  =>  'peperiksaan_email'
            )
        )
    );

    // Phone Number
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'site_phone',
            array(
                'label'     =>  __('Phone Number:', 'sage'),
                'type'      =>  'tel',
                'section'   =>  'main_info',
                'settings'  =>  'site_phone'
            )
        )
    );

    // Peperiksaan Phone Number
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'peperiksaan_phone',
            array(
                'label'     =>  __('Phone Number:', 'sage'),
                'type'      =>  'tel',
                'section'   =>  'peperiksaan_info',
                'settings'  =>  'peperiksaan_phone'
            )
        )
    );

    // Peperiksaan Phone Number
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'peperiksaan_fax',
            array(
                'label'     =>  __('Fax Number:', 'sage'),
                'type'      =>  'tel',
                'section'   =>  'peperiksaan_info',
                'settings'  =>  'peperiksaan_fax'
            )
        )
    );

    // Header Image
    $wp_customize->add_control(
        new WP_Customize_Image_Control(
            $wp_customize,
            'site_logo',
            array(
                'label'     => __('Upload Logo:', 'sage'),
                'section'   => 'site_settings',
                'settings'  => 'site_logo',
                'priority'  => 1
            )
        )
    );

    // Facebook
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'facebook',
            array(
                'label'     =>  __('Facebook URL:', 'sage'),
                'type'      =>  'url',
                'section'   =>  'social_media',
                'settings'  =>  'facebook'
            )
        )
    );

    // Twitter
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'twitter-x',
            array(
                'label'     =>  __('Twitter URL:', 'sage'),
                'type'      =>  'url',
                'section'   =>  'social_media',
                'settings'  =>  'twitter-x'
            )
        )
    );

    // Instagram
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'instagram',
            array(
                'label'     =>  __('Instagram URL:', 'sage'),
                'type'      =>  'url',
                'section'   =>  'social_media',
                'settings'  =>  'instagram'
            )
        )
    );

    // Youtube
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'youtube',
            array(
                'label'     =>  __('Youtube URL:', 'sage'),
                'type'      =>  'url',
                'section'   =>  'social_media',
                'settings'  =>  'youtube'
            )
        )
    );

    // Tiktok
    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'tiktok',
            array(
                'label'     =>  __('Tiktok URL:', 'sage'),
                'type'      =>  'url',
                'section'   =>  'social_media',
                'settings'  =>  'tiktok'
            )
        )
    );

    if (get_theme_mod('site_logo')) {
        $wp_customize->add_control(new Skyrocket_Divider_Custom_Control(
            $wp_customize,
            'divider_header_height',
            array(
                'section' => 'site_settings',
                'input_attrs' => array(
                    'width' => 'full',
                    'type' => 'solid',
                    'margintop' => 30,
                    'marginbottom' => 15,
                ),
                'priority'  => 998
            )
        ));

        $wp_customize->add_control(new Skyrocket_Simple_Notice_Custom_control(
            $wp_customize,
            'header_styling_notice',
            array(
                'label' => __('Logo Styling', 'sage'),
                'description' => __('You may adjust header styles here to your liking. ', 'sage'),
                'section' => 'site_settings',
                'priority' => 998
            )
        ));


        $wp_customize->add_control(
            new Skyrocket_Slider_Custom_Control(
                $wp_customize,
                'site_logo_height',
                array(
                    'label' => __('Header Logo Height (px)', 'sage'),
                    'section' => 'site_settings',
                    'input_attrs' => array(
                        'min' => 1,
                        'max' => 100,
                        'step' => 1
                    ),
                    'priority'  => 998
                )
            )
        );
    }

    if (get_theme_mod('show_footer_logo_image')) {        
        $wp_customize->add_control(
            new Skyrocket_Slider_Custom_Control(
                $wp_customize,
                'footer_logo_height',
                array(
                    'label'         => __('Footer Logo Height (px):', 'sage'),
                    'section'       => 'site_settings',
                    'input_attrs'   => array(
                        'max'   => 200,
                        'min'   => 1,
                        'step'  => 1
                    ),
                    'priority'  => 998
                )
            )
        );
    }
}

/**
 * Shortcode to get current year
 */
function currentYear()
{
    return date('Y');
}

/**
 * Register Actions/Shortcode
 */
add_action('customize_register', 'menu_controller', 100);

add_action('customize_register', 'site_contact');

add_shortcode('year', 'currentYear');