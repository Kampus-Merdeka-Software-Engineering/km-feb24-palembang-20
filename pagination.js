const itemsPerPage = 10; // Number of items per page
let currentPage = 1; // Current page
const maxButtons = 4;
let sortDirection = '';
let currentSortColumn = '';

// Fetch JSON data
fetch('data/product.json')
    .then(response => response.json())
    .then(data => {
        let sortedData = data.slice();
        const tableBody = document.getElementById('table-body');
        const pagination = document.getElementById('pagination');
        const tableSearchInput = document.getElementById('table-search-input');
        const sortProductDetailHeader = document.getElementById('sort-product-detail');
        const sortTotalPenjualanHeader = document.getElementById('sort-total-penjualan');
        const sortIdHeader = document.getElementById('sort-id');
        const sortCategoryHeader = document.getElementById('sort-category');
        const sortTypeHeader = document.getElementById('sort-type');

        // Function to search data by product name in the table
        function handleSearchData(event) {
            const value = event.target.value.trim().toLowerCase();
            sortedData = data.filter(item => item.product_detail.toLowerCase().includes(value));
            currentPage = 1; // Reset to first page after search
            displayItems();
            displayPagination();
        }

        // Function to display items on the current page
        function displayItems() {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedItems = sortedData.slice(start, end);

            tableBody.innerHTML = '';
            paginatedItems.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.product_id}</td>
                    <td>${item.product_category}</td>
                    <td>${item.product_type}</td>
                    <td>${item.product_detail}</td>
                    <td>${item.total_penjualan}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Function to sort data by the specified column
        function sortByColumn(column) {
            if (currentSortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortDirection = 'asc';
                currentSortColumn = column;
            }

            sortedData.sort((a, b) => {
                const valueA = a[column];
                const valueB = b[column];
                if (column === 'total_penjualan' || column === 'product_id') {
                    if (sortDirection === 'asc') {
                        return valueA - valueB;
                    } else {
                        return valueB - valueA;
                    }
                } else {
                    if (sortDirection === 'asc') {
                        return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
                    } else {
                        return valueB.toLowerCase().localeCompare(valueA.toLowerCase());
                    }
                }
            });

            currentPage = 1; // Reset to first page after sorting
            displayItems();
            displayPagination();
            updateSortIcon(column);
        }

        // Function to update the sorting icon based on the current sort direction
        function updateSortIcon(column) {
            const sortIcons = {
                'product_detail': document.getElementById('sort-icon-detail'),
                'total_penjualan': document.getElementById('sort-icon-penjualan'),
                'product_id': document.getElementById('sort-icon-id'),
                'product_category': document.getElementById('sort-icon-category'),
                'product_type': document.getElementById('sort-icon-type')
            };
            
            Object.keys(sortIcons).forEach(key => {
                sortIcons[key].innerHTML = '';
            });
            
            if (sortIcons[column]) {
                sortIcons[column].innerHTML = sortDirection === 'asc' ? ' &#x25B2;' : ' &#x25BC;';
            }
        }

        // Function to display pagination
        function displayPagination() {
            const totalPages = Math.ceil(sortedData.length / itemsPerPage);
            pagination.innerHTML = '';
            const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
            const endPage = Math.min(totalPages, startPage + maxButtons - 1);

            if (startPage > 1) {
                pagination.appendChild(createPaginationButton('Prev', currentPage - 1));
            }

            for (let i = startPage; i <= endPage; i++) {
                pagination.appendChild(createPaginationButton(i, i));
            }

            if (endPage < totalPages) {
                pagination.appendChild(createPaginationButton('Next', currentPage + 1));
            }
        }

        // Function to create pagination button
        function createPaginationButton(label, pageNumber) {
            const button = document.createElement('button');
            button.textContent = label;
            if (pageNumber === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentPage = pageNumber;
                displayItems();
                displayPagination();
            });
            return button;
        }

        displayItems();
        displayPagination();

        // Event listeners for sorting columns
        sortIdHeader.addEventListener('click', () => {
            sortByColumn('product_id');
        });

        sortCategoryHeader.addEventListener('click', () => {
            sortByColumn('product_category');
        });

        sortTypeHeader.addEventListener('click', () => {
            sortByColumn('product_type');
        });

        sortProductDetailHeader.addEventListener('click', () => {
            sortByColumn('product_detail');
        });

        sortTotalPenjualanHeader.addEventListener('click', () => {
            sortByColumn('total_penjualan');
        });

        tableSearchInput.addEventListener('input', handleSearchData);
    })
    .catch(error => console.error('Error fetching data:', error));
