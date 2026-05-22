export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-10">
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-3xl p-10 text-white flex flex-col lg:flex-row gap-6 justify-between items-center">
        <div>
          <h3 className="text-3xl font-bold">
            Dapatkan informasi terbaru
          </h3>

          <p className="mt-2 text-green-100">
            Berlangganan newsletter untuk update terbaru
          </p>
        </div>

        <div className="flex w-full lg:w-auto gap-3">
          <input
            placeholder="Masukkan email Anda"
            className="px-5 py-4 rounded-xl text-black w-full lg:w-96"
          />

          <button className="bg-white text-green-700 px-6 rounded-xl font-semibold">
            Berlangganan
          </button>
        </div>
      </div>
    </section>
  );
}