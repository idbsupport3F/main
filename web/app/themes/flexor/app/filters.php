<?php

/**
 * Theme filters.
 */

namespace App;

/**
 * Add "… Continued" to the excerpt.
 *
 * @return string
 */
add_filter('excerpt_more', function () {
    return sprintf(' &hellip; <a href="%s">%s</a>', get_permalink(), __('Continued', 'sage'));
});

/**
 * From the issue "detected-as-being-under-version-control-git"
 * 
 * @see https://wordpress.org/support/topic/detected-as-being-under-version-control-git/
 */
add_filter('automatic_updates_is_vcs_checkout', __return_false());