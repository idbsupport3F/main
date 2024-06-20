<?php
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

        //Sections
        $wp_customize->add_section(
            'site_contact',
            array(
                'title' => __( 'Site Contacts', 'sage' ),
                'priority' => 1,
                'description' => __( 'Site contacts for your site', 'sage' )
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
                    'section'   =>  'site_contact',
                    'settings'  =>  'show_site_contacts'
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
                    'section'   =>  'site_contact',
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
                    'section'   =>  'site_contact',
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
                    'section'   => 'site_contact',
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

    add_action('customize_register', 'site_contact');
?>