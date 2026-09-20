document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('als-search-input');
    const resultsContainer = document.getElementById('als-search-results');
    let timeoutId; // Used for the debounce function

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const keyword = this.value.trim();

            // Clear and hide the box if fewer than 3 characters.
            if (keyword.length < 3) {
                resultsContainer.style.display = 'none';
                resultsContainer.innerHTML = '';
                return;
            }

            // Show the "searching" status.
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = '<div style="padding:10px; color:#666;">' + alsConfig.searching + '</div>';

            // Performance: debounce — cancel the previous search if the user is still typing.
            clearTimeout(timeoutId);

            // Wait 300ms after the user stops typing, then send the request to the server.
            timeoutId = setTimeout(() => {
                const formData = new FormData();
                formData.append('action', 'als_live_search');
                formData.append('keyword', keyword);
                formData.append('security', alsConfig.nonce); // Security token

                fetch(alsConfig.ajaxUrl, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    resultsContainer.innerHTML = ''; // Clear the searching status

                    if (data.success && data.data.length > 0) {
                        let html = '<ul style="list-style:none; margin:0; padding:0;">';
                        data.data.forEach(item => {
                            // Data from PHP is already escaped (esc_html & esc_url).
                            html += '<li style="border-bottom:1px solid #eee;"><a href="' + item.url + '" style="display:block; padding:10px; text-decoration:none; color:#333;">' + item.title + '</a></li>';
                        });
                        html += '</ul>';
                        resultsContainer.innerHTML = html;
                    } else {
                        resultsContainer.innerHTML = '<div style="padding:10px; color:#d9534f;">' + (data.data.message || alsConfig.noResults) + '</div>';
                    }
                })
                .catch(() => {
                    resultsContainer.innerHTML = '<div style="padding:10px; color:#d9534f;">Error retrieving results.</div>';
                });
            }, 300); // 300 ms delay
        });

        // Close the search results when clicking outside the box.
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
                resultsContainer.style.display = 'none';
            }
        });
    }
});
