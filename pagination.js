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
                if (column === 'total_penjualan') {
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
            const sortIconDetail = document.getElementById('sort-icon-detail');
            const sortIconPenjualan = document.getElementById('sort-icon-penjualan');
            
            sortIconDetail.innerHTML = '';
            sortIconPenjualan.innerHTML = '';
            
            if (column === 'product_detail') {
                sortIconDetail.innerHTML = sortDirection === 'asc' ? ' &#x25B2;' : ' &#x25BC;';
            } else if (column === 'total_penjualan') {
                sortIconPenjualan.innerHTML = sortDirection === 'asc' ? ' &#x25B2;' : ' &#x25BC;';
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
            button.addEventListener('click', () => {
                currentPage = pageNumber;
                displayItems();
                displayPagination();
            });
            return button;
        }

        displayItems();
        displayPagination();

        // Event listener for toggling sort direction when product detail header is clicked
        sortProductDetailHeader.addEventListener('click', () => {
            sortByColumn('product_detail');
        });

        // Event listener for toggling sort direction when total penjualan header is clicked
        sortTotalPenjualanHeader.addEventListener('click', () => {
            sortByColumn('total_penjualan');
        });

        tableSearchInput.addEventListener('input', handleSearchData);
    })
    .catch(error => console.error('Error fetching data:', error));
