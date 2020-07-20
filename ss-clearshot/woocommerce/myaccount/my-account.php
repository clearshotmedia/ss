<?php
/**
 * My Account page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/my-account.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.5.0
 */

defined( 'ABSPATH' ) || exit;
?>


<div class='my-account-header'>
	<div class="my-account-header-breadcrumbs">
	<?php
if ( function_exists('yoast_breadcrumb') ) {
  yoast_breadcrumb( '<p id="breadcrumbs">','</p>' );
}
?>
</div>	
	<h1 class="my-account-header-title">
	<?php 
	$endpoint = WC()->query->get_current_endpoint();
	if( 'edit-account' === $endpoint )  {
		echo "My Account";
	}
	elseif( 'my-service-agreement' === $endpoint )  {
		echo "My Service Agreement";
	}
	elseif( 'appointments' === $endpoint )  {
		echo "My Appointments";
	}
	elseif( 'my-ndis' === $endpoint )  {
		echo "My NDIS";
	}
	elseif( 'view-order' === $endpoint )  {
		echo "My Order";
	}
	elseif( 'utilisation' === $endpoint ){
		echo "Utilisation";
	}
	else {
		echo "My Account";
	}
	?>
	</h1>


</div>

<!-- above my account menu, under header -->
<div class="my-account-above-menu">
	<div class="my-account-hello">
	<?php
	printf(
		/* translators: 1: user display name 2: logout url */
		__( 'Hello %1$s, welcome to Stream Services (not %1$s? <a href="%2$s">Log out</a>)', 'woocommerce' ),
		'<strong>' . esc_html( $current_user->first_name ) . '</strong>',
		esc_url( wc_logout_url() )
	);
	?>
	</div>
	
	<!-- FACEBOOK BUTTON div id="dashboard-profile">
		<?php //echo do_shortcode( '[wppb-edit-profile]' ); ?>
	</div -->

	<div id="myAccount-book-now">
		<a href="/services/"><button>BOOK NOW</button></a>
	</div>

</div>

<?php

/**
 * My Account navigation.
 *
 * @since 2.6.0
 */

 
do_action( 'woocommerce_account_navigation' ); ?>

<div class="woocommerce-MyAccount-content">
	<?php
		/**
		 * My Account content.
		 *
		 * @since 2.6.0
		 */
		do_action( 'woocommerce_account_content' );
	?>
</div>
