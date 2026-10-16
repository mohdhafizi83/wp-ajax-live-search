# Blazing Fast AJAX Live Search

An ultra-fast, database-optimized live search bar with real-time results and JS debouncing.

## Features

- **Instant results** — live search-as-you-type via AJAX, no page reload.
- **Debounced** — 300ms delay while typing; cancels stale requests, so the server only sees one query per pause.
- **Database-optimized** — `no_found_rows`, meta/term caches disabled, capped at 5 results. One lean query per search.
- **Secure** — nonce-verified AJAX endpoint (`check_ajax_referer`), sanitized input, escaped output.
- **Zero dependencies** — vanilla JS, no jQuery.
- **Shortcode-based** — drop `[wp_ajax_live_search]` anywhere; JS only loads where the shortcode is used.

## Usage

Add the shortcode to any page, widget, or template:

```
[wp_ajax_live_search]
```

Minimum keyword length: 3 characters.

## Requirements

| | Minimum | Tested |
|---|---|---|
| WordPress | 6.0 | 6.9 |
| PHP | 7.4 | 8.4 |

## Architecture

- **Frontend**: vanilla JS with `fetch()` + debounce → POSTs to `admin-ajax.php` with nonce
- **Backend**: `wp_ajax_als_live_search` / `wp_ajax_nopriv_als_live_search` → lean `WP_Query` → JSON
- **Security**: nonce + `sanitize_text_field` + `esc_html`/`esc_url` before JSON encode

## Installation

### Upload the zip (recommended)

1. Download `wp-ajax-live-search.zip` from the [latest release](https://github.com/mohdhafizi83/wp-ajax-live-search/releases/latest).
2. In wp-admin, go to **Plugins → Add New → Upload Plugin**.
3. Choose the zip, click **Install Now**, then **Activate**.

### WP-CLI

```bash
wp plugin install --activate https://github.com/mohdhafizi83/wp-ajax-live-search/releases/latest/download/wp-ajax-live-search.zip
```

### Manual

Copy the plugin folder into `wp-content/plugins/` and activate it under **Plugins → Installed Plugins**.

## Configuration

There is **no settings page** — the plugin is shortcode-driven.

- Place `[wp_ajax_live_search]` in any page, post, widget, or theme template.
- Searches published **posts** only, capped at 5 results.
- Behaviour knobs live in `assets/live-search.js`: minimum keyword length (3 chars) and debounce delay (300 ms).

## FAQ

**Why do I have to type 3 characters before results appear?**
The 3-character minimum avoids firing a database query on single-letter keystrokes. It can be changed in `assets/live-search.js`.

**Does it search pages or products?**
Out of the box it searches published posts (`post_type => 'post'`). Edit the `WP_Query` args in `wp-ajax-live-search.php` to change the post type.

**Will it slow down my site?**
No. The JS only loads on pages that contain the shortcode, requests are debounced (300 ms), and the query runs with `no_found_rows` and disabled meta/term caches.

**Does it work for logged-out visitors?**
Yes — the AJAX endpoint is registered for both logged-in and guest users (`wp_ajax_*` and `wp_ajax_nopriv_*`), protected by a nonce.

## Screenshots

Screenshot (add your own)

_No screenshot assets are committed to this repository yet. Drop an image at `assets/screenshots/screenshot-1.png` and replace this placeholder — do not hotlink invented screenshots._

## License

GPL v2 or later.
