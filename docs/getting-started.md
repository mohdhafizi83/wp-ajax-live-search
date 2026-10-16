# Getting started — Blazing Fast AJAX Live Search

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

## Verify it works

Add `[wp_ajax_live_search]` to a page, view it, and type at least 3 characters — results should appear without a page reload.

For troubleshooting, see the FAQ in the [README](../README.md#faq).
