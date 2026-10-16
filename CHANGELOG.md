# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-16

### Added
- `[wp_ajax_live_search]` shortcode with live search-as-you-type via AJAX.
- Debounced vanilla-JS frontend (300 ms, 3-character minimum, stale requests cancelled).
- Lean `WP_Query` backend: `no_found_rows`, meta/term caches disabled, 5-result cap.
- Nonce-verified AJAX endpoint with sanitized input and escaped output.
