export default function Hero() {
  return (
    <section className="relative bg-white">

      <div className="max-w-7xl mx-auto px-4 pt-14 pb-10 grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-green-800">
            Membangun Ekosistem
            <br />
            Ekonomi Syariah Jawa Barat
          </h1>

          <p className="mt-5 text-gray-600 leading-relaxed max-w-lg">
            Bersama memberdayakan umat, menguatkan ekonomi syariah,
            dan membangun kemandirian menuju Jawa Barat Juara Lahir Batin.
          </p>

          <div className="mt-7 flex gap-4">
            <button className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition">
              Bergabung Sekarang
            </button>

            <button className="border border-green-700 text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition">
              Jelajahi Program
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white/60 to-transparent z-10" />

          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
            className="rounded-2xl w-full h-[420px] object-cover shadow-xl"
            alt="MES Building"
          />
        </div>

      </div>
    </section>
  );
}