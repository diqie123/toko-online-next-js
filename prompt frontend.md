Berikut adalah **prompt yang lengkap dan detail** yang bisa kamu gunakan (misalnya di Grok, ChatGPT, Claude, atau Copilot) untuk menghasilkan kode frontend **website toko online statis** menggunakan **Next.js 14 (App Router)**.

Prompt ini dirancang agar outputnya **sangat lengkap**: mencakup struktur proyek lengkap, semua page utama, komponen reusable, state management untuk cart (menggunakan localStorage karena statis), fake data produk, styling dengan Tailwind CSS, responsif, SEO-friendly, dan siap di-deploy ke Vercel/Netlify.

### Prompt yang bisa kamu copy-paste langsung:

```
Buat sebuah website toko online statis lengkap menggunakan Next.js 14 dengan App Router, TypeScript, dan Tailwind CSS. Website ini harus sepenuhnya statis (menggunakan SSG), tanpa backend, dengan data produk dari file JSON lokal.

Fitur yang wajib ada:
1. Layout utama (app/layout.tsx) dengan Navbar responsif (logo, menu kategori, search bar, ikon cart dengan badge jumlah item), Footer (links, social media, copyright), dan metadata SEO lengkap.
2. Homepage (app/page.tsx):
   - Hero section dengan slider sederhana (3-4 slide) menggunakan komponen carousel.
   - Section "Featured Products" (grid 4 kolom desktop, 2 kolom tablet, 1 kolom mobile).
   - Section "Categories" (grid kartu kategori).
   - Section "Best Sellers" atau "New Arrivals".
3. Halaman Products/List (app/products/page.tsx):
   - Filter berdasarkan kategori (dropdown atau sidebar).
   - Sorting (price low-high, high-low, newest).
   - Search produk berdasarkan nama.
   - Grid produk dengan pagination sederhana (atau infinite scroll jika memungkinkan secara statis).
4. Halaman Product Detail (app/products/[slug]/page.tsx):
   - Dynamic route berdasarkan slug.
   - Gambar produk (multiple thumbnail + main image zoom-able sederhana).
   - Deskripsi, harga, rating, stok (fake), varian (ukuran/warna jika ada).
   - Tombol "Add to Cart".
   - Section "Related Products".
5. Cart Page (app/cart/page.tsx):
   - Tampilan daftar item di cart.
   - Update quantity, remove item.
   - Subtotal, tax (fake), total harga.
   - Tombol "Proceed to Checkout".
   - Data cart disimpan di localStorage agar tetap ada saat refresh.
6. Checkout Page (app/checkout/page.tsx):
   - Form sederhana (nama, email, alamat, metode pembayaran fake).
   - Ringkasan order.
   - Tombol "Place Order" yang menampilkan modal konfirmasi sukses (karena statis, tidak ada payment gateway sungguhan).
7. Komponen reusable:
   - ProductCard
   - AddToCartButton
   - QuantitySelector
   - Modal (untuk konfirmasi)
   - LoadingSkeleton untuk produk
   - Carousel/Slider sederhana (tanpa library eksternal berat, gunakan pure CSS atau minimal library jika perlu)
8. State management:
   - Gunakan Context API + useReducer untuk Cart state global.
   - Atau Zustand (jika lebih ringan).
9. Data:
   - Buat file lib/products.json dengan minimal 20 produk dummy (id, slug, name, description, price, category, images[], rating, stock, variants[]).
   - Kategori: minimal 5 (misal: Elektronik, Fashion, Makanan, dll).
10. Styling:
    - Tailwind CSS sepenuhnya.
    - Dark mode support (toggle di navbar).
    - Mobile-first responsif.
11. Optimasi:
    - Image optimization dengan Next.js Image.
    - Lazy loading untuk gambar.
    - generateStaticParams untuk dynamic routes produk.
    - Metadata dinamis per halaman.
12. Tambahan nice-to-have:
    - Search global di navbar (mencari di semua produk).
    - 404 page custom.
    - Toast notification saat add to cart (gunakan react-hot-toast atau komponen sederhana).

Berikan struktur folder lengkap, semua file penting (app/, components/, lib/, context/, public/, dll) dengan kode lengkap yang bisa langsung dijalankan setelah npm install dan npm run dev. Sertakan instruksi singkat instalasi dependencies yang dibutuhkan (tailwind, icons seperti lucide-react atau heroicons, dll).

Pastikan kode bersih, terstruktur baik, menggunakan best practices Next.js 14, dan sepenuhnya statis (semua data di-build time).
```

### Tips saat menggunakan prompt ini:
- Jika AI membatasi panjang output, minta secara bertahap: pertama “buat struktur folder dan layout utama”, lalu “buat homepage”, dst.
- Kamu bisa tambahkan detail spesifik seperti nama toko (“TokoMuharram”), warna tema, atau fitur tambahan sebelum menjalankan prompt.
- Dependencies yang biasanya muncul: tailwindcss, @tailwindcss/typography, lucide-react atau heroicons, react-hot-toast (untuk notifikasi), dll.

Prompt ini sudah dirancang agar hasilnya **sangat lengkap** dan langsung bisa dipakai sebagai basis proyek toko online statis. Semoga membantu! Jika butuh modifikasi promptnya, beri tahu saya.