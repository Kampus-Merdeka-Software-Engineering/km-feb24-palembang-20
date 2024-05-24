document.addEventListener("DOMContentLoaded", function () {
    const salesData = [
      { location: "Hell's Kitchen", category: "Coffee", sales: 20187 },
      { location: "Astoria", category: "Coffee", sales: 20025 },
      { location: "Lower Manhattan", category: "Coffee", sales: 18204 },
      { location: "Astoria", category: "Tea", sales: 16260 },
      { location: "Hell's Kitchen", category: "Tea", sales: 15277 },
      { location: "Lower Manhattan", category: "Tea", sales: 13912 },
      { location: "Lower Manhattan", category: "Bakery", sales: 7890 },
      { location: "Hell's Kitchen", category: "Bakery", sales: 7617 },
      { location: "Astoria", category: "Bakery", sales: 7289 },
      { location: "Astoria", category: "Drinking Chocolate", sales: 4300 },
      { location: "Hell's Kitchen", category: "Drinking Chocolate", sales: 3763 },
      { location: "Lower Manhattan", category: "Drinking Chocolate", sales: 3405 },
      { location: "Lower Manhattan", category: "Flavours", sales: 2930 },
      { location: "Hell's Kitchen", category: "Flavours", sales: 2370 },
      { location: "Astoria", category: "Flavours", sales: 1490 },
      { location: "Hell's Kitchen", category: "Coffee beans", sales: 720 },
      { location: "Lower Manhattan", category: "Coffee beans", sales: 531 },
      { location: "Astoria", category: "Coffee beans", sales: 502 },
      { location: "Hell's Kitchen", category: "Loose Tea", sales: 485 },
      { location: "Lower Manhattan", category: "Loose Tea", sales: 381 },
      { location: "Lower Manhattan", category: "Branded", sales: 349 },
      { location: "Astoria", category: "Loose Tea", sales: 344 },
      { location: "Astoria", category: "Branded", sales: 279 },
      { location: "Hell's Kitchen", category: "Packaged Chocolate", sales: 197 },
      { location: "Lower Manhattan", category: "Packaged Chocolate", sales: 180 },
      { location: "Hell's Kitchen", category: "Branded", sales: 119 },
      { location: "Astoria", category: "Packaged Chocolate", sales: 110 }
    ];
  
    const rowsPerPage = 10;
    let currentPage = 1;
  
    function displayTable(data, page) {
      const tableBody = document.querySelector("#salesTable tbody");
      tableBody.innerHTML = "";
  
      const start = (page - 1) * rowsPerPage;
      const end = page * rowsPerPage;
      const paginatedData = data.slice(start, end);
  
      paginatedData.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${row.location}</td><td>${row.category}</td><td>${row.sales}</td>`;
        tableBody.appendChild(tr);
      });
  
      document.getElementById("prevPage").classList.toggle("disabled", page === 1);
      document.getElementById("nextPage").classList.toggle("disabled", end >= data.length);
    }
  
    document.getElementById("prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayTable(salesData, currentPage);
      }
    });
  
    document.getElementById("nextPage").addEventListener("click", () => {
      if (currentPage * rowsPerPage < salesData.length) {
        currentPage++;
        displayTable(salesData, currentPage);
      }
    });
  
    displayTable(salesData, currentPage);
  
    // Membuat grafik untuk total penjualan
    fetch("data/totalpenjualan.json")
      .then(response => response.json())
      .then(data => {
        const ctxTotalPenjualan = document.getElementById("totalPenjualanChart").getContext("2d");
        const totalPenjualanChart = new Chart(ctxTotalPenjualan, {
          type: "bar",
          data: {
            labels: data.map(item => item.product_type),
            datasets: [{
              label: "Total Penjualan",
              data: data.map(item => item['total_penjualan']),
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => console.error("Error loading data: ", error));
  
    // Membuat grafik untuk rata-rata harga
    fetch("data/ratarata.json")
      .then(response => response.json())
      .then(data => {
        const ctxRataRataHarga = document.getElementById("rataRataHargaChart").getContext("2d");
        const rataRataHargaChart = new Chart(ctxRataRataHarga, {
          type: "bar",
          data: {
            labels: data.map(item => item.product_category),
            datasets: [{
              label: "Rata-rata Harga",
              data: data.map(item => item['Rata-rata_harga']),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => console.error("Error loading data: ", error));
  
    // Membuat grafik untuk jumlah varian
    fetch("data/jumlahvariantotalpenjualan.json")
      .then(response => response.json())
      .then(data => {
        const ctxJumlahVarian = document.getElementById("jumlahVarianChart").getContext("2d");
        const jumlahVarianChart = new Chart(ctxJumlahVarian, {
          type: "bar",
          data: {
            labels: data.map(item => item.product_category),
            datasets: [{
              label: "Jumlah Varian",
              data: data.map(item => item.Num_Variant),
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => console.error("Error loading data: ", error));
  
    // Membuat grafik untuk varian product per category
    fetch("data/varianproductpercategory.json")
      .then(response => response.json())
      .then(data => {
        const ctxvarianProduct = document.getElementById("varianProductChart").getContext("2d");
        const varianProductChart = new Chart(ctxvarianProduct, {
          type: "pie",
          data: {
            labels: data.map(item => item.product_category),
            datasets: [{
              label: "Jumlah Varian Product Per Category",
              data: data.map(item => item['Record Count']),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(201, 203, 207, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(201, 203, 207, 1)"
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
          }
        });
      })
      .catch(error => console.error("Error loading data: ", error));
  
    // Membuat grafik untuk penjualan bakery
    fetch("data/penjualanbakery.json")
      .then(response => response.json())
      .then(data => {
        const ctxPenjualanBakery = document.getElementById("penjualanBakeryChart").getContext("2d");
        const penjualanBakeryChart = new Chart(ctxPenjualanBakery, {
          type: "bar",
          data: {
            labels: data.map(item => item.product_type),
            datasets: [{
              label: "Penjualan Bakery",
              data: data.map(item => item['total_penjualan']),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => console.error("Error loading data: ", error));
  
    // Membuat grafik untuk penjualan scone per hari
    fetch("data/penjualanscone.json")
      .then(response => response.json())
      .then(data => {
        const ctxPenjualanScone = document.getElementById("penjualanSconeChart").getContext("2d");
        const penjualanSconeChart = new Chart(ctxPenjualanScone, {
          type: "line",
          data: {
            labels: data.map(item => item.hour_of_day),
            datasets: [{
              label: "Penjualan Scone per Hari",
              data: data.map(item => item['transaction_count']),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => console.error("Error loading data: ", error));
  
    // Membuat grafik untuk penjualan drinking chocolate per hari
    fetch("data/drinkingchocolateperhari.json")
      .then(response => response.json())
      .then(data => {
        const ctxPenjualanDrinkingChocolate = document.getElementById("penjualanDrinkingChocolateChart").getContext("2d");
        const penjualanDrinkingChocolateChart = new Chart(ctxPenjualanDrinkingChocolate, {
          type: "line",
          data: {
            labels: data.map(item => item.hour_of_day),
            datasets: [{
              label: "Penjualan Drinking Chocolate per Hari",
              data: data.map(item => item['transaction_count']),
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => console.error("Error loading data: ", error));
  });
  