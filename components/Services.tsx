const services = [
  "Koperasi Syariah",
  "Pelatihan & Sertifikasi",
  "Marketplace Anggota",
  "Pendampingan Bisnis",
  "Donasi & ZISWAF",
  "Penerbitan & Media",
];

export default function Services() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">
        Layanan & Unit Usaha
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {services.map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-6 border text-center"
          >
            <div className="w-14 h-14 bg-green-100 rounded-full mx-auto mb-4" />

            <h3 className="font-semibold">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}