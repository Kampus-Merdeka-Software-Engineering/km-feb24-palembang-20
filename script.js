
let totalPenjualanChart;

// Mengambil dan merender grafik total penjualan
const fetchAndRenderTotalPenjualanChart = (filterValue = "") => {
  fetch("data/totalpenjualan.json")
    .then(response => response.json())
    .then(data => {
      const filteredData = filterValue ? data.filter(item => item.product_type === filterValue) : data;
      if (totalPenjualanChart) {
        totalPenjualanChart.destroy();
      }
      const ctxTotalPenjualan = document.getElementById("totalPenjualanChart").getContext("2d");
      totalPenjualanChart = new Chart(ctxTotalPenjualan, {
        type: "bar",
        data: {
          labels: filteredData.map(item => item.product_type),
          datasets: [{
            label: "Total Penjualan",
            data: filteredData.map(item => item['total_penjualan']),
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
};

// Membuat untuk filter dropdown dan rendering grafik awal
  fetch("data/totalpenjualan.json")
    .then(response => response.json())
    .then(data => {
      // Filter options
      const filterSelect = document.getElementById('totalPenjualanFilter');
      const productTypes = [...new Set(data.map(item => item.product_type))];
      productTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        filterSelect.appendChild(option);
      });

      // Melakukan render awal
      fetchAndRenderTotalPenjualanChart();
      // event listener
      filterSelect.addEventListener('change', (event) => {
        const selectedType = event.target.value;
        fetchAndRenderTotalPenjualanChart(selectedType);
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