const departmentSelect = document.getElementById('departmentSelect');
        const dataTable = document.getElementById('data-table');

        departmentSelect.addEventListener('change', function() {
            const selectedDepartment = departmentSelect.value;
            const rows = dataTable.getElementsByTagName('tr');
            
            for (let i = 1; i < rows.length; i++) {
                const departmentCell = rows[i].getElementsByTagName('td')[3];
                const display = (selectedDepartment === 'all' || departmentCell.textContent === selectedDepartment) ? '' : 'none';
                rows[i].style.display = display;
            }
        });
        