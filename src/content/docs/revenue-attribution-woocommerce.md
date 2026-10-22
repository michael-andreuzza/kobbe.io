---
title: WooCommerce revenue attribution
description: Attribute WooCommerce order revenue to Kobbe journeys.
order: 47
category: Revenue attribution
navLabel: WooCommerce
brandLogo:
  url: ../../images/brands/woo.svg
  alt: WooCommerce logo
---

Use WooCommerce when you sell from a WordPress store and want to connect orders back to Kobbe traffic.

Kobbe listens for **Order updated** webhooks, records an order once it is paid (status **Processing** or **Completed**), and reads `kobbe_attribution_id` from the order meta.

## Setup

1. Enable **WooCommerce** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. In WordPress, go to **WooCommerce → Settings → Advanced → Webhooks** and click **Add webhook**.
4. Set **Status** to **Active** and **Topic** to **Order updated**.
5. Paste the Kobbe webhook URL as the **Delivery URL**.
6. Enter a long random **Secret**, save the webhook, and paste the same secret into Kobbe.

Order updated fires several times per order. Kobbe records each order once, the first time it arrives as paid.

## Tracker

Load the full tracker with revenue attribution on your store:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Store the attribution ID on orders

Add this snippet with the [Code Snippets](https://wordpress.org/plugins/code-snippets/) plugin or in your theme's `functions.php`. It keeps the attribution ID in the WooCommerce cart session and saves it on the order at checkout. It works with both the classic and the block checkout, and it does not set any new cookies.

```php
<?php
// Kobbe revenue attribution for WooCommerce.
add_action('wp_footer', function () {
    if (!function_exists('WC')) return; ?>
    <script>
    (function () {
        var tries = 0;
        (function send() {
            var k = window.kobbe;
            var id = k && (k.getAttributionId ? k.getAttributionId() : k.attributionId);
            if (!id) { if (++tries < 20) setTimeout(send, 250); return; }
            fetch(<?php echo wp_json_encode(WC_AJAX::get_endpoint('kobbe_attribution')); ?>, {
                method: 'POST',
                body: new URLSearchParams({ kobbe_attribution_id: id }),
                credentials: 'same-origin',
                keepalive: true
            });
        })();
    })();
    </script>
<?php });

add_action('wc_ajax_kobbe_attribution', function () {
    $id = isset($_POST['kobbe_attribution_id'])
        ? sanitize_text_field(wp_unslash($_POST['kobbe_attribution_id']))
        : '';
    if ($id && WC()->session && WC()->session->has_session()) {
        WC()->session->set('kobbe_attribution_id', $id);
    }
    wp_send_json_success();
});

function kobbe_save_attribution($order) {
    $id = WC()->session ? WC()->session->get('kobbe_attribution_id') : '';
    if ($id) {
        $order->update_meta_data('kobbe_attribution_id', $id);
        $order->save();
    }
}
add_action('woocommerce_checkout_order_created', 'kobbe_save_attribution');
add_action('woocommerce_store_api_checkout_order_processed', 'kobbe_save_attribution');
```

The ID is only stored once the visitor has a cart, so browsing visitors get no WooCommerce session from this snippet.

## Webhook

WooCommerce signs each delivery with the **X-WC-Webhook-Signature** header, a base64 HMAC-SHA256 of the request body. Kobbe verifies it with your saved secret. The test ping WooCommerce sends when you save the webhook is acknowledged and ignored.
