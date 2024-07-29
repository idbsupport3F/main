<?php

/**
 * Register Custom Navigation Walker
 */
function register_navwalker()
{
    require_once get_template_directory() . '/class-wp-bootstrap-navwalker.php';
}
add_action('after_setup_theme', 'register_navwalker');

add_filter('nav_menu_link_attributes', 'prefix_bs5_dropdown_data_attribute', 20, 3);
/**
 * Use namespaced data attribute for Bootstrap's dropdown toggles.
 *
 * @param array    $atts HTML attributes applied to the item's `<a>` element.
 * @param WP_Post  $item The current menu item.
 * @param stdClass $args An object of wp_nav_menu() arguments.
 * @return array
 */
function prefix_bs5_dropdown_data_attribute($atts, $item, $args)
{
    if (is_a($args->walker, 'WP_Bootstrap_Navwalker')) {
        if (array_key_exists('data-toggle', $atts)) {
            unset($atts['data-toggle']);
            $atts['data-bs-toggle'] = 'dropdown';
        }
    }
    return $atts;
}

add_filter('nav_menu_link_attributes', 'remove_dropdown_toggle', 10, 4);
/**
 * Remove default bootstrap class names on <a> tags after <li>
 */
function remove_dropdown_toggle($atts, $item, $args, $depth)
{
    if (array_key_exists('class', $atts) && str_contains($atts['class'], 'dropdown-toggle')) {
        $atts['class'] = trim(str_replace('dropdown-toggle', '', $atts['class']));
        $atts['class'] = trim(str_replace('nav-link', '', $atts['class']));
    }
    return $atts;
}

add_filter('wp_nav_menu_before_a_tags', 'insert_icon', 20, 4);
/**
 * Insert custom dropdown icon using bootstrap icons
 */
function insert_icon($val, $item, $atts, $args)
{
    if (str_contains($atts['class'], 'toggle-dropdown')) {
        $val .= '<i class="bi bi-chevron-down toggle-dropdown"></i>';
    }

    return $val;
}

add_filter('nav_menu_submenu_css_class', 'submenu_css', 20, 3);
/**
 * Remove 'dropdown' class on ul element due to dropdown class template is breaking
 */
function submenu_css($classes, $args, $depth)
{
    foreach ($classes as $k => $class) {
        unset($classes[$k]);
    }
    return $classes;
}

/**
 * Limit Footer Navigation Items to 5 only
 * 
 * @param array Array Menu Items that has string HTML value
 * @param array Arguments for wp_nav_menu
 * @source https://stackoverflow.com/a/75850270
 */
function limit_quicklinks_menu_items($items, $args)
{
    if (is_array($items) && $args->theme_location == 'footer_navigation') {
        $items = array_slice($items, 0, get_theme_mod('footer_navigation_limits'));
    }
    return $items;
}

add_filter('wp_nav_menu_objects', 'limit_quicklinks_menu_items', 10, 4);
