// Menmbuat chart total penjualan
let totalPenjualanChart;
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
            data: filteredData.map(item => item.total_penjualan),
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          indexAxis: 'x',
          scales: {
            beginAtZero: true
          }
        }
      });
    })
    .catch(error => console.error("Error loading data: ", error));
};

// Membuat filter dropdown 
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


// Fungsi untuk toggle sidebar
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('show');
}

// Membuat chart untuk rata-rata harga
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

// Membuat chart untuk jumlah varian
let jumlahVarianChart;
const fetchAndRenderJumlahVarianChart = (filterValue = "") => {
  fetch("data/jumlahvariantotalpenjualan.json")
    .then(response => response.json())
    .then(data => {
      const filteredData = filterValue ? data.filter(item => item.product_category === filterValue) : data;

      if (jumlahVarianChart) {
        jumlahVarianChart.destroy();
      }

      const ctxJumlahVarian = document.getElementById("jumlahVarianChart").getContext("2d");
      jumlahVarianChart = new Chart(ctxJumlahVarian, {
        type: "bar",
        data: {
          labels: filteredData.map(item => item.product_category),
          datasets: [{
            label: "Jumlah Varian",
            data: filteredData.map(item => item.Num_Variant),
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
            yAxisID: 'y',
          }, {
            label: "Total Penjualan",
            data: filteredData.map(item => item.total_penjualan),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            yAxisID: 'y1',
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              position: 'left',
              title: {
                display: true,
                text: 'Jumlah Varian'
              }
            },
            y1: {
              beginAtZero: true,
              position: 'right',
              grid: {
                drawOnChartArea: false, 
              },
            }
          }
        }
      });
    })
    .catch(error => console.error("Error loading data: ", error));
};

// Membuat filter dropdown 
  fetch("data/jumlahvariantotalpenjualan.json")
  .then(response => response.json())
  .then(data => {
    const uniqueCategories = [...new Set(data.map(item => item.product_category))];
    const filterSelect = document.getElementById("jumlahVarianFilter");

    uniqueCategories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      filterSelect.appendChild(option);
    });

    filterSelect.addEventListener("change", (event) => {
      fetchAndRenderJumlahVarianChart(event.target.value);
    });

    // Render initial chart with all data
    fetchAndRenderJumlahVarianChart();
  })
  .catch(error => console.error("Error loading data: ", error));

// Membuat chart untuk varian product per category
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

// Membuat chart untuk penjualan bakery
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

// Membuat chart untuk penjualan scone per hari
fetch("data/penjualanscone.json")
  .then(response => response.json())
  .then(data => {
    const ctxPenjualanScone = document.getElementById("penjualanSconeChart").getContext("2d");
    const penjualanSconeChart = new Chart(ctxPenjualanScone, {
      type: "line",
      data: {
        labels: data.map(item => item.hour_of_day),
        datasets: [{
          label: "Penjualan Scone per Jam",
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

// Membuat chart untuk penjualan drinking chocolate per hari
fetch("data/drinkingchocolateperhari.json")
  .then(response => response.json())
  .then(data => {
    const ctxPenjualanDrinkingChocolate = document.getElementById("penjualanDrinkingChocolateChart").getContext("2d");
    const penjualanDrinkingChocolateChart = new Chart(ctxPenjualanDrinkingChocolate, {
      type: "line",
      data: {
        labels: data.map(item => item.hour_of_day),
        datasets: [{
          label: "Penjualan Drinking Chocolate per Jam",
          data: data.map(item => item['transaction_count']),
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

  // sidebar button
  document.addEventListener('DOMContentLoaded', () => { 
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
