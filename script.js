// Variabel untuk menyimpan data makanan
let consumedFoods = [];

// Mendapatkan elemen-elemen DOM
const foodForm = document.getElementById('foodForm');
const foodList = document.getElementById('foodList');
const totalCaloriesDisplay = document.getElementById('totalCalories');

// Fungsi untuk menghitung total kalori
function calculateTotalCalories() {
    let total = 0;
    consumedFoods.forEach(food => {
        // Kalori Total = Kalori per Porsi * Jumlah Porsi
        total += food.caloriesPerServing * food.servings;
    });
    totalCaloriesDisplay.textContent = total.toFixed(1); // Tampilkan 1 angka di belakang koma
}

// Fungsi untuk me-render (menampilkan) daftar makanan
function renderFoodList() {
    foodList.innerHTML = ''; // Kosongkan daftar yang ada

    consumedFoods.forEach((food, index) => {
        const totalFoodCalories = food.caloriesPerServing * food.servings;
        
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>
                <strong>${food.name}</strong> 
                (${food.servings} porsi) 
                - ${totalFoodCalories.toFixed(1)} kkal
            </span>
            <button class="delete-btn" data-index="${index}">Hapus</button>
        `;
        
        foodList.appendChild(listItem);
    });
    
    // Setelah merender daftar, hitung ulang total kalori
    calculateTotalCalories();
}

// Event Listener untuk penambahan makanan baru
foodForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form melakukan reload halaman

    // Ambil nilai dari input
    const name = document.getElementById('foodName').value.trim();
    const caloriesPerServing = parseFloat(document.getElementById('caloriesPerServing').value);
    const servings = parseFloat(document.getElementById('servings').value);

    // Validasi sederhana
    if (name && caloriesPerServing > 0 && servings > 0) {
        // Buat objek makanan baru
        const newFood = {
            name: name,
            caloriesPerServing: caloriesPerServing,
            servings: servings
        };
        
        // Tambahkan ke array
        consumedFoods.push(newFood);
        
        // Perbarui tampilan
        renderFoodList();

        // Reset form
        foodForm.reset();
    } else {
        alert('Mohon isi semua kolom dengan nilai yang valid.');
    }
});

// Event Listener untuk tombol hapus (menggunakan delegasi event)
foodList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const indexToDelete = event.target.getAttribute('data-index');
        
        // Hapus makanan dari array berdasarkan index
        consumedFoods.splice(indexToDelete, 1);
        
        // Perbarui tampilan
        renderFoodList();
    }
});

// Panggil renderFoodList saat pertama kali halaman dimuat (untuk inisialisasi)
renderFoodList();
