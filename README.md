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

## License

GPL v2 or later.
