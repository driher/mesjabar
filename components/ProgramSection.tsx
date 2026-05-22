const programs = [
  "Akademi Ekonomi Syariah",
  "Pendamping Halal",
  "Koperasi Syariah",
  "Donasi & ZISWAF",
];

export default function ProgramSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">
        Program Unggulan
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {programs.map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-6 border"
          >
            <div className="w-14 h-14 rounded-full bg-green-100 mb-5" />

            <h3 className="text-xl font-semibold">
              {item}
            </h3>

            <p className="text-gray-500 mt-3">
              Program pemberdayaan ekonomi syariah
              untuk masyarakat Jawa Barat.
            </p>

            <button className="mt-5 text-green-700 font-semibold">
              Selengkapnya →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}