<?php
    /**
     * Customize Global
     * 
     * @see https://developer.wordpress.org/reference/hooks/customize_register/
     */
    function site_contact($wp_customize){
        // Settings
        $wp_customize->add_setting('site_email', array('default' => ''));
        $wp_customize->add_setting('site_phone', array('default' => ''));
        $wp_customize->add_setting('site_logo', array('default' => ''));
        $wp_customize->add_setting('twitter-x', array('default' => ''));
        $wp_customize->add_setting('facebook', array('default' => ''));
        $wp_customize->add_setting('instagram', array('default' => ''));
        $wp_customize->add_setting('linkedin', array('default' => ''));
        $wp_customize->add_setting('show_site_contacts', array('default' => ''));
        $wp_customize->add_setting('site_address', array('default' => ''));

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
            new WP_Customize_Control(
                $wp_customize,
                'show_site_contacts',
                array(
                    'label'     =>  __('Show Header Site Contacts?', 'sage'),
                    'type'      =>  'checkbox',
                    'section'   =>  'site_info',
                    'settings'  =>  'show_site_contacts'
                )
            )
        );

        // Site Address
        $wp_customize->add_control(
            new WP_Customize_Control(
                $wp_customize,
                'site_address',
                array(
                    'label'     =>  __('Address:', 'sage'),
                    'type'      =>  'textarea',
                    'section'   =>  'site_info',
                    'settings'  =>  'site_address'
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
                    'section'   =>  'site_info',
                    'settings'  =>  'site_email'
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

        // Instagram
        $wp_customize->add_control(
            new WP_Customize_Control(
                $wp_customize,
                'instagram',
                array(
                    'label'     =>  __('Facebook URL:', 'sage'),
                    'type'      =>  'url',
                    'section'   =>  'social_media',
                    'settings'  =>  'instagram'
                )
            )
        );

        // LinkedIn
        $wp_customize->add_control(
            new WP_Customize_Control(
                $wp_customize,
                'linkedin',
                array(
                    'label'     =>  __('Facebook URL:', 'sage'),
                    'type'      =>  'url',
                    'section'   =>  'social_media',
                    'settings'  =>  'linkedin'
                )
            )
        );
    }

    /**
     * Adjust Menu to control depth
     */
    add_action('customize_register', function ($wp_customize) {
        $wp_customize->add_setting('menu_depth', array('default' => 3));
        // Get Existing Panel named 'nav_menus'
        $panel = $wp_customize->get_panel('nav_menus');
        // Add Custom Panel
        $wp_customize->add_panel('menu_depth_panel', array(
            'priority' => 12,
            'title' => 'Menu Depth',
            'description' => 'You can set the depth of your header menu items in this template'
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
                    'description'   =>  'How many levels of the hierarchy are to be included.',
                    'input_attrs'   =>  [
                        'value'         =>  1,
                        'min'           => 0,
                        'max'           => 10,
                        'placeholder'   => 'Insert your desire depth hierarchy'
                    ],
                    'settings'      =>  'menu_depth'
                )
            )
        );
    }, 12);

    add_action('customize_register', 'site_contact');
?>