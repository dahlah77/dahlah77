import { Link } from 'react-router-dom';

const layanan = [
  ['OJP Ride', 'Pergi ke mana saja di Pelaihari dengan driver lokal terpercaya.'],
  ['OJP Food', 'Pesan makanan & minuman dari warung dan resto sekitar.'],
  ['OJP Send', 'Kirim barang & dokumen, cepat, aman, mudah dipantau.'],
  ['OJP Teman', 'Teman jalan, nongkrong, event, atau wisata lokal yang aman.'],
];

export function App() {
  return (
    <main className="ojp">
      <nav className="nav">
        <div className="brand"><img src="/ojp-logo.png" alt="Ojek Pelaihari OJP" /><b>Ojek Pelaihari OJP</b></div>
        <div className="menu"><a>Beranda</a><a>Layanan</a><a>Tarif</a><a>Cara Kerja</a><a>Jadi Mitra</a><a>FAQ</a></div>
        <div className="actions"><button className="secondary">Masuk</button><button className="primary">Pesan Sekarang</button></div>
      </nav>

      <section className="hero parallax">
        <span className="badge">OJP, P-nya Papas Habis.</span>
        <h1>Ojek Pelaihari<br/>dalam genggaman.</h1>
        <p>Mau pergi, pesan makan, kirim barang, atau cari teman jalan? OJP siap papas habis kebutuhanmu di Pelaihari.</p>
        <div className="cta"><button className="primary">Pesan Sekarang</button><button className="secondary">Gabung Jadi Mitra</button></div>
        <div className="meta"><span>Pelaihari & sekitarnya</span><span>Mitra lokal terpercaya</span></div>
      </section>

      <section className="section">
        <h2>Layanan OJP</h2><p>Empat layanan utama untuk kebutuhan harianmu.</p>
        <div className="cards">{layanan.map(([t, d]) => <article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className="section">
        <h2>Cara Kerja OJP</h2><p>Lima langkah sederhana untuk mulai.</p>
        <ol><li>Pilih Layanan</li><li>Isi Detail</li><li>Driver Menerima</li><li>Pantau Status</li><li>Bayar & Rating</li></ol>
      </section>

      <section className="section dark parallax-soft">
        <h2>Keamanan adalah prioritas kami.</h2>
        <ul><li>Driver terverifikasi & berlisensi</li><li>Tombol darurat di setiap order</li><li>Share trip ke kontak terpercaya</li><li>Rating & sistem laporan</li><li>Aturan ketat untuk OJP Teman (21+)</li></ul>
      </section>

      <footer className="footer">
        <div><img src="/ojp-logo.png" alt="OJP" className="logo"/><h4>Ojek Pelaihari</h4><p>Layanan ojek lokal untuk warga Pelaihari, Tanah Laut.</p><p className="lime">OJP, P-nya Papas Habis.</p></div>
        <div><h5>Legal</h5><Link to="/terms">Syarat Layanan</Link><Link to="/privacy">Kebijakan Privasi</Link><Link to="/safety">Panduan Keamanan</Link></div>
      </footer>
    </main>
  );
}
