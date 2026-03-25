=== Blazing Fast AJAX Live Search ===
Contributors: mohdhafizi83
Tags: search, live search, ajax search, performance, fast search
Requires at least: 6.0
Tested up to: 6.9.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Provide your users with instant, real-time search results as they type, completely optimized for extreme server performance and zero database bloat.

== Description ==

Live search is an incredible user experience feature, but most plugins will crash your server if you have high traffic. Why? Because they query your database for every single letter a user types.

**Blazing Fast AJAX Live Search** is engineered differently by a senior developer for maximum scale. 

**The Performance Secret:**
1. **JavaScript Debouncing:** We implement a strict 300ms delay in the browser. The plugin waits until the user *stops* typing before sending the query. If a user types "marketing" quickly, it sends 1 query instead of 9!
2. **Extreme WP_Query Optimization:** In the backend, we instruct the database to completely ignore calculating the total number of pages (`no_found_rows`) and skip loading heavy metadata/tags (`update_post_meta_cache`). It only pulls the absolute minimum data needed (Title and URL) for lightning-fast JSON responses.

**Features:**
* Simple shortcode implementation: `[wp_ajax_live_search]`.
* Zero jQuery. Built with modern, fast Vanilla JS (Fetch API).
* Clean, unopinionated inline CSS that inherits your theme's fonts.
* Bulletproof security with strict Nonce validation and input sanitization (`sanitize_text_field`).

== Installation ==

1. Upload the `wp-ajax-live-search` folder to your `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Place the shortcode `[wp_ajax_live_search]` anywhere on your site (in a widget, page, or header template).
4. Start typing to see the magic happen!

== Frequently Asked Questions ==

= Does this search WooCommerce products or Custom Post Types? =
Currently, this ultra-lightweight version is strictly optimized to search standard WordPress blog 'posts'. Adding complex joins for product data would compromise the blazing fast response times this plugin is known for.

= Why doesn't it search when I type 1 or 2 letters? =
To prevent the database from returning thousands of useless results (like searching for the letter "a"), the live search requires a minimum of 3 characters before it triggers the database query.

== Changelog ==

= 1.0.0 =
* Initial release on the WordPress repository.
* Implemented JS Debounce algorithm.
* Optimized WP_Query for minimum latency.