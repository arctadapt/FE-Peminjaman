import React from 'react';
import { FaBookOpen, FaClock, FaHeadset, FaStar } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-300 to-blue-500">
      <nav className="bg-white shadow">
        <div className="max-w-5xl mx-auto flex justify-between items-center py-4">
          <h1 className="text-blue-600 text-2xl font-bold">Peminjaman Barang Sekolah</h1>
          <ul className="flex space-x-6">
            <li><a href="#features" className="text-gray-800 hover:text-blue-600">Fitur</a></li>
            <li><a href="#testimonials" className="text-gray-800 hover:text-blue-600">Testimoni</a></li>
            <li><a href="#contact" className="text-gray-800 hover:text-blue-600">Kontak</a></li>
          </ul>
        </div>
      </nav>

      <header className="text-white py-20 flex flex-col items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900/?school')" }}>
        <h1 className="text-5xl font-extrabold">Selamat Datang di Peminjaman Barang Sekolah</h1>
        <p className="mt-3 text-lg">Kami membuat peminjaman barang lebih mudah dan cepat.</p>
        <button className="mt-5 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
          Mulai Pinjam Sekarang
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <section id="features" className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Fitur Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow hover:shadow-xl transition duration-300">
              <FaBookOpen className="text-blue-600 text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Peminjaman yang Cepat</h3>
              <p>Mudahkan proses peminjaman barang dengan sistem yang efisien.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow hover:shadow-xl transition duration-300">
              <FaClock className="text-blue-600 text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Waktu yang Fleksibel</h3>
              <p>Pilih waktu peminjaman yang sesuai dengan kebutuhan Anda.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow hover:shadow-xl transition duration-300">
              <FaHeadset className="text-blue-600 text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Support 24/7</h3>
              <p>Tim kami siap membantu Anda kapan saja.</p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Statistik Peminjaman</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-600">500+</h3>
              <p>Barang Dipinjam</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-600">300+</h3>
              <p>Siswa Terdaftar</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-600">24/7</h3>
              <p>Support Tersedia</p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Apa Kata Mereka?</h2>
          <div className="space-y-6">
            <div className="flex flex-col items-center border-l-4 border-blue-600 pl-4">
              <p className="italic">“Peminjaman barang jadi lebih mudah, cepat, dan efisien!”</p>
              <p className="font-bold">- Siswa A</p>
            </div>
            <div className="flex flex-col items-center border-l-4 border-blue-600 pl-4">
              <p className="italic">“Sistem yang sangat membantu! Terima kasih!”</p>
              <p className="font-bold">- Siswa B</p>
            </div>
            <div className="flex flex-col items-center border-l-4 border-blue-600 pl-4">
              <p className="italic">“Saya suka fitur-fitur baru yang ditambahkan.”</p>
              <p className="font-bold">- Siswa C</p>
            </div>
          </div>
        </section>

        <section id="contact" className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Kontak Kami</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Pesan"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Kirim Pesan
            </button>
          </form>
        </section>

        <button className="w-full bg-blue-600 text-white mb-8 py-3 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
          Mulai Pinjam Sekarang
        </button>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Peminjaman Barang Sekolah. Semua hak dilindungi.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-blue-400">Facebook</a>
          <a href="#" className="hover:text-blue-400">Instagram</a>
          <a href="#" className="hover:text-blue-400">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
