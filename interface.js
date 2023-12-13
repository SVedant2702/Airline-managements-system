
        function openTab(tabIndex) {
            var tabs = document.querySelectorAll('.tab');
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].style.display = 'none';
            }
            document.getElementById('tab' + tabIndex).style.display = 'block';
        }

        function openLoginTab() {
            openTab(1); // Open the first tab when the login button is clicked
        }
