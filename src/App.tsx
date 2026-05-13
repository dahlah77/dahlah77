import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { formatCurrency } from './utils/helpers';

const services = [
  { name: 'OJP Ride', desc: 'Pergi ke mana saja di Pelaihari dengan driver lokal terpercaya.' },
  { name: 'OJP Food', desc: 'Pesan makanan dan minuman dari warung/resto sekitar.' },
  { name: 'OJP Send', desc: 'Kirim barang dan dokumen dengan cepat, aman, dan mudah dipantau.' },
  { name: 'OJP Teman', desc: 'Pendamping sosial non-seksual secara aman dan terverifikasi.' },
];

function Landing() {
  return <main className="ojp">
    <nav className="nav"><div className="brand"><img src="/ojp-logo.png" alt="OJP" /><b>Ojek Pelaihari</b></div><div className="menu"><a href="#layanan">Layanan</a><a href="#cara-kerja">Cara Kerja</a><a href="#keamanan">Keamanan</a><Link to="/terms">Syarat</Link></div><div className="actions"><Link className="secondary" to="/login">Masuk</Link><Link className="primary" to="/app">Pesan Sekarang</Link></div></nav>
    <section className="hero parallax"><span className="badge">OJP, P-nya Papas Habis.</span><h1>Ojek Pelaihari dalam genggaman.</h1><p>Mau pergi, pesan makan, kirim barang, atau cari teman jalan? OJP siap papas habis.</p><div className="cta"><Link className="primary" to="/app">Pesan Sekarang</Link><Link className="secondary" to="/driver">Gabung Jadi Mitra</Link></div></section>
    <section id="layanan" className="section"><h2>Layanan OJP</h2><div className="cards">{services.map((s) => <article key={s.name}><h3>{s.name}</h3><p>{s.desc}</p></article>)}</div></section>
    <section id="cara-kerja" className="section"><h2>Cara Kerja OJP</h2><ol><li>Pilih layanan</li><li>Isi lokasi dan detail pesanan</li><li>Driver/mitra menerima order</li><li>Pantau status</li><li>Bayar dan beri rating</li></ol></section>
    <section id="keamanan" className="section dark parallax-soft"><h2>Keamanan OJP</h2><ul><li>Driver terverifikasi</li><li>Share order/trip</li><li>Tombol darurat</li><li>Rating dan laporan</li><li>Admin lokal siap membantu</li><li>Aturan OJP Teman 21+</li></ul></section>
    <footer className="footer"><div><img src="/ojp-logo.png" className="logo" alt="OJP"/><h4>Ojek Pelaihari / OJP</h4><p>Layanan lokal untuk warga Pelaihari.</p><p className="lime">OJP, P-nya Papas Habis.</p></div><div><h5>Halaman</h5><Link to="/terms">Syarat Layanan</Link><Link to="/privacy">Kebijakan Privasi</Link><Link to="/safety">Panduan Keamanan</Link></div></footer>
  </main>;
}

const Dashboard = ({ title, children }: any) => <main className="dash"><header><img src="/ojp-logo.png" alt="OJP"/><div><h1>{title}</h1><p>WITA • Pelaihari, Tanah Laut</p></div></header>{children}</main>;

const CustomerApp = () => <Dashboard title="Dashboard Customer"><div className="cards">{services.map(s=><article key={s.name}><h3>{s.name}</h3><p>{s.desc}</p><button className="primary">Pesan</button></article>)}</div><p className="muted">Belum ada pesanan. Yuk mulai pesan layanan OJP.</p></Dashboard>;
const DriverApp = () => <Dashboard title="Dashboard Driver"><div className="cards"><article><h3>Status Driver</h3><button className="primary">Online</button><button className="secondary">Offline</button></article><article><h3>Order Masuk</h3><p>Belum ada driver online saat ini. Coba lagi sebentar atau hubungi admin.</p></article></div></Dashboard>;
const MerchantApp = () => <Dashboard title="Dashboard Merchant"><div className="cards"><article><h3>Pesanan</h3><p>0 order hari ini</p></article><article><h3>Menu</h3><p>Tambah menu untuk mulai jualan.</p><button className="primary">Tambah Menu</button></article></div></Dashboard>;
const AdminApp = () => <Dashboard title="Dashboard Admin"><div className="cards"><article><h3>Order Hari Ini</h3><p>12</p></article><article><h3>Pendapatan Kotor</h3><p>{formatCurrency(1350000)}</p></article><article><h3>Komisi Platform</h3><p>{formatCurrency(192000)}</p></article><article><h3>Komplain Open</h3><p>2</p></article></div></Dashboard>;

const Legal = ({ title, body }: { title: string, body: string[] }) => <main className="legal"><img src="/ojp-logo.png" alt="OJP"/><h1>{title}</h1><ul>{body.map((b) => <li key={b}>{b}</li>)}</ul><Link to="/" className="secondary">Kembali</Link></main>;

export function App() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Legal title="Masuk OJP" body={["Autentikasi email/password via Supabase disiapkan pada tahap backend."]} />} />
    <Route path="/terms" element={<Legal title="Syarat Layanan" body={["OJP adalah platform penghubung customer dan mitra.","Pengguna wajib memberikan data yang benar.","Aktivitas ilegal dilarang.","OJP Teman bukan layanan seksual/escort/prostitusi.","Pelanggaran dapat menyebabkan suspend akun."]} />} />
    <Route path="/privacy" element={<Legal title="Kebijakan Privasi" body={["Data dikumpulkan: nama, nomor HP, lokasi, riwayat order, dokumen mitra.","Data digunakan untuk operasional layanan, keamanan, verifikasi, dan dukungan."]} />} />
    <Route path="/safety" element={<Legal title="Panduan Keamanan" body={["Gunakan fitur share order.","Simpan emergency contact.","Gunakan mitra terverifikasi.","Laporkan masalah via menu bantuan.","OJP Teman hanya untuk pendamping sosial non-seksual.","Dilarang aktivitas seksual, ilegal, dan berbahaya."]} />} />
    <Route path="/app" element={<CustomerApp />} />
    <Route path="/driver" element={<DriverApp />} />
    <Route path="/merchant" element={<MerchantApp />} />
    <Route path="/admin" element={<AdminApp />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
