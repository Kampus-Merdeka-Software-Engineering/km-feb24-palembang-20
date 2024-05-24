const itemsPerPage = 10; // Number of items per page
let currentPage = 1; // Current page
const maxButtons = 5;
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
                const valueA = a[column].toLowerCase();
                const valueB = b[column].toLowerCase();
                if (sortDirection === 'asc') {
                    return valueA.localeCompare(valueB);
                } else {
                    return valueB.localeCompare(valueA);
                }
            });

            currentPage = 1; // Reset to first page after sorting
            displayItems();
            displayPagination();
            updateSortIcon(column);
        }

        // Function to update the sorting icon based on the current sort direction
        function updateSortIcon(column) {
            sortProductDetailHeader.innerHTML = 'Detail';
            sortProductDetailHeader.innerHTML += currentSortColumn === column ? (sortDirection === 'asc' ? ' &#x25B2;' : ' &#x25BC;') : '';
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

        tableSearchInput.addEventListener('input', handleSearchData)
    })
    .catch(error => console.error('Error fetching data:', error));
