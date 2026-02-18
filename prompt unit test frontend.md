Berikut adalah **prompt yang lengkap dan detail** yang bisa kamu gunakan (di Grok, ChatGPT, Claude, atau Copilot) untuk menghasilkan **unit test lengkap** untuk proyek website toko online statis Next.js yang sudah kita bahas sebelumnya.

Prompt ini dirancang agar outputnya mencakup:
- Setup testing environment (Jest + React Testing Library + Testing Library untuk Next.js)
- Test untuk semua komponen reusable utama
- Test untuk semua page utama (dengan mocking yang diperlukan)
- Test untuk Cart Context / state management (add, remove, update quantity, localStorage persistence)
- Test untuk utility functions (jika ada)
- Snapshot testing, rendering, user interactions, edge cases
- Coverage yang tinggi

### Prompt yang bisa kamu copy-paste langsung:

```
Kamu memiliki proyek Next.js 14 (App Router) toko online statis dengan TypeScript, Tailwind CSS, dan struktur sebagai berikut:
- app/layout.tsx (Navbar, Footer)
- app/page.tsx (Homepage dengan Hero, Featured Products, Categories)
- app/products/page.tsx (Products list dengan filter, sort, search, pagination)
- app/products/[slug]/page.tsx (Product detail dynamic route)
- app/cart/page.tsx (Cart page)
- app/checkout/page.tsx (Checkout page)
- components/: ProductCard, AddToCartButton, QuantitySelector, Carousel, Modal, LoadingSkeleton, Toast/notification
- context/CartContext.tsx (menggunakan Context API + useReducer atau Zustand untuk cart state global, persist ke localStorage)
- lib/products.json (data dummy produk)
- lib/utils.ts (jika ada helper functions)

Buat unit test lengkap menggunakan Jest dan React Testing Library (@testing-library/react, @testing-library/jest-dom) untuk seluruh proyek ini.

Persyaratan:
1. Setup testing:
   - Berikan jest.config.js lengkap untuk Next.js
   - Berikan setupTests.ts atau jest.setup.ts (dengan jest-dom matchers, mock localStorage, mock next/image, mock next/router jika diperlukan)
   - Tambahkan script di package.json: "test": "jest", "test:watch": "jest --watch"
   - Dependencies yang dibutuhkan: jest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, ts-jest, jest-environment-jsdom

2. Struktur folder test:
   - __tests__/components/ untuk test komponen
   - __tests__/app/ untuk test page (atau co-locate *.test.tsx di samping file asli)
   - __tests__/context/ untuk test CartContext
   - __tests__/utils/ jika ada

3. Test yang wajib ada (minimal):
   - ProductCard: renders nama, harga, gambar, rating; klik "Add to Cart" memanggil callback
   - AddToCartButton: renders correctly, disabled jika stok 0, memanggil addToCart dari context
   - QuantitySelector: increment/decrement, tidak boleh kurang dari 1 atau lebih dari stok
   - Carousel: renders slides, navigasi next/prev, auto-play jika ada
   - Navbar: renders logo, menu, search bar, cart badge dengan jumlah item benar
   - Homepage: renders hero, featured products grid, categories
   - Products page: renders grid produk, filter kategori bekerja, sorting bekerja, search filter nama, pagination berpindah halaman
   - Product detail page: renders detail produk berdasarkan slug (mock generateStaticParams), related products, add to cart menambah ke cart
   - Cart page: renders item list, update quantity, remove item, hitung subtotal/total benar, empty state
   - Checkout page: form validation sederhana (jika ada), ringkasan order sesuai cart
   - CartContext: 
        - addToCart menambah item baru atau increment quantity
        - removeFromCart menghapus item
        - updateQuantity mengubah jumlah
        - loadFromLocalStorage saat init
        - saveToLocalStorage saat state berubah
        - clearCart
   - Toast/notification: muncul saat add to cart

4. Best practices:
   - Gunakan userEvent untuk simulasi interaksi user
   - Mock context dengan wrapper provider
   - Mock localStorage dengan jest.spyOn/storage mock
   - Mock next/image dengan component dummy
   - Mock data produk dari products.json
   - Test edge cases: empty cart, produk tidak ditemukan, quantity melebihi stok
   - Gunakan describe/it yang jelas dan terstruktur
   - Sertakan expect(toBeInTheDocument()), expect(queryByText()), screen.getByRole, dll
   - Snapshot testing untuk komponen utama

Berikan semua file test lengkap (*.test.tsx) dengan kode yang bisa langsung dijalankan. Sertakan juga instruksi instalasi dependencies dan cara run test. Pastikan coverage tinggi (>90% untuk komponen dan logic utama).
```

### Tips penggunaan:
- Jika output AI terlalu panjang, minta bertahap: pertama "buat setup Jest dan CartContext test", lalu "test komponen ProductCard dan AddToCartButton", dst.
- Kamu bisa tambahkan detail seperti "gunakan Zustand jika proyek memakainya" atau "fokus pada coverage cart logic".
- Setelah dapat kode testnya, jalankan `npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest` dan setup sesuai instruksi.

Prompt ini akan menghasilkan suite unit test yang sangat lengkap dan siap pakai. Jika butuh modifikasi atau tambahan (misal integration test dengan Cypress), beri tahu saya!