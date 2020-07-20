<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! function_exists( 'neve_child_load_css' ) ):
	/**
	 * Load CSS file.
	 */
	function neve_child_load_css() {
		wp_enqueue_style( 'neve-child-style', trailingslashit( get_stylesheet_directory_uri() ) . 'style.css', array( 'neve-style' ), NEVE_VERSION );
	}
endif;
add_action( 'wp_enqueue_scripts', 'neve_child_load_css', 20 );



/* add font awesome to all pages */
add_action('wp_footer', 'add_font_awesome');
function add_font_awesome(){
?>
<script src="https://kit.fontawesome.com/e4dc55a16a.js" crossorigin="anonymous"></script>
<?php
};


// add custom js file
add_action('wp_enqueue_scripts', 'custom_js');
function custom_js() {
    wp_enqueue_script('custom', get_stylesheet_directory_uri().'/scripts/custom.js', 
    array('wc-appointments-moment'), false, true);
}

add_action( 'wp_enqueue_scripts', 'add_my_script' );
function add_my_script() {
    wp_enqueue_script(
        'booking-form', // name your script so that you can attach other scripts and de-register, etc.
        get_stylesheet_directory_uri() . '/scripts/booking-form.js', // this is the location of your script file
        array('jquery') // this array lists the scripts upon which your script depends
    );
}

