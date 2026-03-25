document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('als-search-input');
    const resultsContainer = document.getElementById('als-search-results');
    let timeoutId; // Variable untuk fungsi debounce

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const keyword = this.value.trim();

            // Kosongkan dan sembunyikan kotak jika kurang 3 huruf
            if (keyword.length < 3) {
                resultsContainer.style.display = 'none';
                resultsContainer.innerHTML = '';
                return;
            }

            // Tunjuk status sedang mencari
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = '<div style="padding:10px; color:#666;">' + alsConfig.searching + '</div>';

            // PRESTASI: Debounce - Batal carian sebelumnya jika pengguna masih menaip
            clearTimeout(timeoutId);

            // Tunggu 300ms selepas pengguna berhenti menaip, baru hantar request ke server
            timeoutId = setTimeout(() => {
                const formData = new FormData();
                formData.append('action', 'als_live_search');
                formData.append('keyword', keyword);
                formData.append('security', alsConfig.nonce); // Token keselamatan

                fetch(alsConfig.ajaxUrl, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    resultsContainer.innerHTML = ''; // Kosongkan status searching

                    if (data.success && data.data.length > 0) {
                        let html = '<ul style="list-style:none; margin:0; padding:0;">';
                        data.data.forEach(item => {
                            // Data dari PHP telah pun di-escape (esc_html & esc_url)
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
            }, 300); // 300 milisaat delay
        });

        // Tutup hasil carian jika klik di luar kotak
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
                resultsContainer.style.display = 'none';
            }
        });
    }
});