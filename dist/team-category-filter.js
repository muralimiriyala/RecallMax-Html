jQuery(document).ready(function ($) {
    $('#tab-links a').on('click', function (e) {
        e.preventDefault();

        var category = $(this).text().trim();

        $.ajax({
            type: 'POST',
            url: ajax_object.ajax_url,
            data: {
                action: 'get_team_members',
                category: category,
            },
            success: function (response) {
                // Update the content with the response
                $('.data-tab-rows').html(response);
                initializeTabFunctionality();
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error:', status, error);
            }
        });
    });

    // Function to initialize tab functionality (reusable after AJAX)
    function initializeTabFunctionality() {
        const tabTexts = document.querySelectorAll('.tab-slide-up');

        // Update heights for all tabText elements
        function updateHeights() {
            tabTexts.forEach(function (tabText) {
                const initialHeight = tabText.querySelector('.tab-head').offsetHeight + 41;
                tabText.style.height = `${initialHeight}px`;
                tabText.dataset.initialHeight = initialHeight;

                if (tabText.dataset.tab === 'true') {
                    const desc = tabText.querySelector('.tab-desc');
                    if (desc) {
                        desc.style.maxHeight = `${desc.scrollHeight}px`;
                    }
                }
            });
        }
        updateHeights();
        
        tabTexts.forEach(function (tabText) {
            const tabHead = tabText.querySelector('.tab-head');

            tabText.addEventListener('click', function (e) {
                if (!e.target.closest('a')) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (tabText.dataset.tab !== 'true') {
                        document.querySelectorAll('.tab-slide-up').forEach(function (tabel) {
                            if (tabText !== tabel) {
                                tabel.dataset.tab = 'false';
                                tabel.classList.remove('tab-open');
                                const desc = tabel.querySelector('.tab-desc');
                                if (desc) {
                                    desc.style.maxHeight = '';
                                }
                                tabel.style.height = `${tabel.dataset.initialHeight}px`;
                            }
                        });
                        tabText.dataset.tab = 'true';
                        tabText.classList.add('tab-open');
                        tabText.style.height = `calc(100% - 8px)`;
                        const desc = tabText.querySelector('.tab-desc');
                        if (desc) {
                            desc.style.maxHeight = `${desc.scrollHeight}px`;
                        }
                    }
                }
            });

            const tabArrow = tabHead.querySelector('.tab-arrow');
            if (tabArrow) {
                tabArrow.addEventListener('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    if (tabText.dataset.tab === 'true') {
                        tabText.dataset.tab = 'false';
                        tabText.classList.remove('tab-open');
                        const desc = tabText.querySelector('.tab-desc');
                        tabText.style.height = `${tabText.dataset.initialHeight}px`;
                        if (desc) {
                            desc.style.maxHeight = '';
                        }
                    }
                });
            }
        });

        // Close all tabs if clicked outside of tabText elements
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.tab-slide-up')) {
                document.querySelectorAll('.tab-slide-up').forEach(function (tabel) {
                    tabel.dataset.tab = 'false';
                    tabel.classList.remove('tab-open');
                    const desc = tabel.querySelector('.tab-desc');
                    if (desc) {
                        desc.style.maxHeight = '';
                    }
                    tabel.style.height = `${tabel.dataset.initialHeight}px`;
                });
            }
        });

        // Add event listener to window resize and orientationchange
        window.addEventListener('resize', updateHeights);
        window.addEventListener('orientationchange', updateHeights);

        // Function to handle tab links
        function tabFun() {
            let tabattr = this.getAttribute('data-name');
            const tabRows = document.querySelectorAll('.data-tab-row');

            // Hide all tab rows and remove 'open' class
            tabRows.forEach(function (tabItem) {
                tabItem.style.display = 'none';
                tabItem.classList.remove('open');
            });

            // Show the corresponding tab row and add 'open' class
            const targetTabRow = document.querySelector(`.data-tab-row[data-tab='${tabattr}']`);
            if (targetTabRow) {
                targetTabRow.style.display = 'block';
                targetTabRow.classList.add('open');
            }
        }

        // Add click event listeners to all tab links
        const tabLinks = document.querySelectorAll('ul.tab-links > li > a');
        tabLinks.forEach(function (tabLink) {
            tabLink.addEventListener('click', tabFun);
        });
    }

    // Call the function initially to set up the tabs
    initializeTabFunctionality();
});
