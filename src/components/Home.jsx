import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Selamat Datang di Sistem Peminjaman Barang Sekolah</h1>
          <p className="lead mb-4">Platform terbaik untuk meminjam barang-barang keperluan kegiatan sekolah seperti bola, raket, dan lainnya secara efisien.</p>
          <button className="btn btn-primary btn-lg">Mulai Meminjam</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-4">Fitur-Fitur</h2>
          <div className="row">
            <div className="col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Kelola Peminjaman Barang</h5>
                  <p className="card-text">Dengan mudah kelola peminjaman barang seperti bola, net, raket, dan lain-lain dalam satu tempat.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Lacak Status Peminjaman</h5>
                  <p className="card-text">Pantau status barang yang dipinjam dan dikembalikan secara real-time dengan mudah.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Notifikasi Pengingat</h5>
                  <p className="card-text">Dapatkan notifikasi pengingat untuk pengembalian barang tepat waktu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2>Tentang Kami</h2>
          <p className="lead">
            Sistem Peminjaman Barang Sekolah dirancang untuk memudahkan proses peminjaman dan pengelolaan barang-barang yang digunakan untuk berbagai kegiatan sekolah.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2>Hubungi Kami</h2>
          <p>Jika ada pertanyaan, hubungi kami di <a href="mailto:support@schoolloanapp.com">support@schoolloanapp.com</a></p>
          <button className="btn btn-outline-primary">Kirim Pesan</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
