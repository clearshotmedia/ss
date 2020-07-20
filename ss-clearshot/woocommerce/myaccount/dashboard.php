<?php
/**
 * My Account Dashboard
 *
 * Shows the first intro screen on the account dashboard.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/dashboard.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce/Templates
 * @version     2.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>
<span class="privacy-myaccount">We take your privacy and data security seriously!  <a href="/privacy">Find out how</a>.</span>
<div id="dashboard-profile">
<h3>Welcome to Stream Services</h3>

<?php echo do_shortcode( '[wppb-edit-profile]' ); ?>
	</div>
<p> Welcome to your Stream Services Dashboard. From this page you can book an appointment with a service provider, check your upcoming times and dates, view and update your account details and make sure your NDIS and service agreement details are always up to date. 
</p>

<p>
<a href="/services"><button>BOOK NOW</button></a>
</p>

<h4> Adding New Services
</h4>
<p> If you want to add new services to your account, we’ll need to create a new service agreement. You’ll be asked to select the new services that you’d like to add, and confirm that your current account details are up to date. Once your new Service Agreement has been approved, you can then book an appointment with your new service providers. 
</p>

<p>
<a href="https://streamservices.com.au/my-account/add-service/"><button>Add A Service</button></a>
</p>

<h4>Do you need assistance? 
</h4>
<p>If you need help or assistance at any point, you can call or email our team. Call us on 1300 721 964 or email hello@steamservices.com.au. 
</p>
<p>
<a href="tel:0477 784 441"><button>Call Us</button></a>
<a href="mailto:hello@steamservices.com.au"><button>Email Us</button></a>
</p>


<br />
<?php echo do_shortcode( '[my_appointments]' ); ?>
<!-- p -->
	<?php /*
	printf(
		__( 'From your account dashboard you can view your <a href="%1$s">recent orders</a>, manage your <a href="%2$s">shipping and billing addresses</a>, and <a href="%3$s">edit your password and account details</a>.', 'woocommerce' ),
		esc_url( wc_get_endpoint_url( 'orders' ) ),
		esc_url( wc_get_endpoint_url( 'edit-address' ) ),
		esc_url( wc_get_endpoint_url( 'edit-account' ) )
	);
	*/?>
<!-- /p -->

<?php
	/**
	 * My Account dashboard.
	 *
	 * @since 2.6.0
	 */
	do_action( 'woocommerce_account_dashboard' );

	/**
	 * Deprecated woocommerce_before_my_account action.
	 *
	 * @deprecated 2.6.0
	 */
	do_action( 'woocommerce_before_my_account' );

	/**
	 * Deprecated woocommerce_after_my_account action.
	 *
	 * @deprecated 2.6.0
	 */
	do_action( 'woocommerce_after_my_account' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
