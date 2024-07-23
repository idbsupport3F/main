<?php

    /**
     * Bootstrap Menu Controller
     */
    function menu_controller($wp_customize) {
        $wp_customize->add_setting('menu_depth', array('default' => 3));
        // Get Existing Panel named 'nav_menus'
        $panel = $wp_customize->get_panel('nav_menus');
        // Add Custom Panel
        $wp_customize->add_panel('menu_depth_panel', array(
            'priority' => 12,
            'title' => 'Menu Depth',
            'description' => __('You can set the depth of your header menu items in this template', 'sage')
        ));
        // Add Custom Section
        $wp_customize->add_section(
            'menu_depth_section',
            array(
                'title' => __('Adjust Depth', 'sage'),
                'description' => __('You may adjust the depth value of a page that appears in header.', 'sage'),
                'panel' =>  $panel->id,
            )
        );
        // Depth Number
        $wp_customize->add_control(
            new WP_Customize_Control(
                $wp_customize,
                'menu_depth',
                array(
                    'label'         =>  __('Menu Depth:', 'sage'),
                    'type'          =>  'number',
                    'section'       =>  'menu_depth_section',
                    'description'   =>  __('How many levels of the hierarchy are to be included.', 'sage'),
                    'input_attrs'   =>  [
                        'value'         =>  1,
                        'min'           => 0,
                        'max'           => 10,
                        'placeholder'   => __('Insert your desire depth hierarchy', 'sage')
                    ],
                    'settings'      =>  'menu_depth'
                )
            )
        );
    }
    /**
     * Customize Global
     * 
     * @see https://developer.wordpress.org/reference/hooks/customize_register/
     */
    function site_contact($wp_customize){
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
        $wp_customize->add_setting('show_site_contacts',
            array(
                'default' => false,
                'transport' => 'refresh',
                'sanitize_callback' => 'skyrocket_switch_sanitization'
            )
        );
        $wp_customize->add_setting('show_footer_logo_image',
            array(
                'default' => true,
                'transport' => 'refresh',
                'sanitize_callback' => 'skyrocket_switch_sanitization'
            )
        );
        $wp_customize->add_setting('site_address',
            array(
                'default' => '',
                'transport' => 'postMessage',
                'sanitize_callback' => 'wp_kses_post'
            )
        );
        $wp_customize->add_setting('peperiksaan_address',
            array(
                'default' => '',
                'transport' => 'postMessage',
                'sanitize_callback' => 'wp_kses_post'
            )
        );
        $wp_customize->add_setting('show_site_name', 
            array(
                'default' => false,
                'transport' => 'refresh',
                'sanitize_callback' => 'skyrocket_switch_sanitization'
            )
        );
        $wp_customize->add_setting('hide_footer_site_name',
            array(
                'default' => false,
                'transport' => 'refresh',
                'sanitize_callback' => 'skyrocket_switch_sanitization'
            )
        );


        //Sections
        $wp_customize->add_section(
            'site_info',
            array(
                'title' => __( 'Site Info', 'sage' ),
                'priority' => 1,
                'description' => __( 'Site Info for your site', 'sage' )
            )
        );

        $wp_customize->add_section(
            'social_media',
            array(
                'title' => __( 'Social Media', 'sage' ),
                'priority' => 2,
                'description' => __( 'Insert your social media links here', 'sage' )
            )
        );

        // Controls
        // Show Site Contacts
        $wp_customize->add_control(
            new Skyrocket_Toggle_Switch_Custom_control( $wp_customize, 'show_site_contacts',
                array(
                    'label' => __('Hide header site contacts?', 'sage'),
                    'section' => 'site_info'
                )
            ) 
        );

        // Show Site Name
        $wp_customize->add_control(
            new Skyrocket_Toggle_Switch_Custom_control( $wp_customize, 'show_site_name',
                array(
                    'label' => __('Show site title?', 'sage'),
                    'section' => 'site_info'
                )
            ) 
        );

        // Hide Footer Site Name
        $wp_customize->add_control(
            new Skyrocket_Toggle_Switch_Custom_control( $wp_customize, 'hide_footer_site_name',
                array(
                    'label' => __('Show footer site title?', 'sage'),
                    'section' => 'site_info'
                )
            )
        );

        // Show Footer  Image
        $wp_customize->add_control(
            new Skyrocket_Toggle_Switch_Custom_control( $wp_customize,
            'show_footer_logo_image',
                array(
                    'label' => __('Show footer image?', 'sage'),
                    'section' => 'site_info'
                )
            )
        );

        // Site Address
        $wp_customize->add_control(
        new Skyrocket_TinyMCE_Custom_control(
            $wp_customize,
            'site_address',
            array(
                'label' => __('Site Address', 'sage'),
                'description' => __('Type the site address location in here.', 'sage'),
                'section' => 'site_info',
                'input_attrs' => array(
                    'toolbar1' => 'bold italic bullist numlist alignleft aligncenter alignright link',
                    'toolbar2' => 'formatselect outdent indent | blockquote charmap',
                    'mediaButtons' => false,
                )
            )
        ));

        // Peperiksaan Address
        $wp_customize->add_control(
        new Skyrocket_TinyMCE_Custom_control(
            $wp_customize,
            'peperiksaan_address',
            array(
                'label' => __('Peperiksaan Address', 'sage'),
                'description' => __('Type the peperiksaan address location in here.', 'sage'),
                'section' => 'site_info',
                'input_attrs' => array(
                    'toolbar1' => 'bold italic bullist numlist alignleft aligncenter alignright link',
                    'toolbar2' => 'formatselect outdent indent | blockquote charmap',
                    'mediaButtons' => false,
                )
            )
        ));

        // Email Address
        $wp_customize->add_control(
            new WP_Customize_Control(
                $wp_customize,
                'site_email',
                array(
                    'label'     =>  __('Main Email Address:', 'sage'),
                    'type'      =>  'email',
                    'section'   =>  'site_info',
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
                    'label'     =>  __('Peperiksaan Email Address:', 'sage'),
                    'type'      =>  'email',
                    'section'   =>  'site_info',
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
                    'section'   =>  'site_info',
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
                    'label'     =>  __('Peperiksaan Phone Number:', 'sage'),
                    'type'      =>  'tel',
                    'section'   =>  'site_info',
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
                    'label'     =>  __('Peperiksaan Fax Number:', 'sage'),
                    'type'      =>  'tel',
                    'section'   =>  'site_info',
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
                    'label'     => __('Upload Header Image:', 'sage'),
                    'section'   => 'site_info',
                    'settings'  => 'site_logo'
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
    }

    /**
     * Register Actions
     */
    add_action('customize_register', 'menu_controller', 12);

    add_action('customize_register', 'site_contact');
?>