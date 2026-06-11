'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // =========================================================================
    // PASTIKAN KAMU SUDAH MENGGANTI URL DI BAWAH INI DENGAN URL GOOGLE APPS SCRIPT ASLI 
    // YANG DIDAPATKAN SETELAH MELAKUKAN RE-DEPLOY (VERSI BARU)
    // =========================================================================
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwFEHXMALspbcLQwVuGR9TLgapB6Vkxa1pU9Eh0ToMhmAE9-NeKH5GM9886kYjg-pt1dg/exec';


    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Mencegah form diblokir oleh kebijakan CORS browser
        headers: {
          'Content-Type': 'text/plain', // Menggunakan text/plain agar sinkron dengan Apps Script terbaru
        },
        body: JSON.stringify({ email: email }),
      });

      // Karena menggunakan mode 'no-cors', jika fetch tidak melempar error (catch),
      // maka pengiriman data ke Google Sheets dianggap berhasil.
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Pengiriman newsletter gagal:', error);
      setStatus('error');
    }
  };

  return (
    <section className="pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[32px] bg-gradient-to-r from-green-900 via-green-800 to-emerald-700 px-6 py-7 shadow-xl sm:px-10 sm:py-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            
            {/* BAGIAN TEKS */}
            <div className="max-w-xl">
              <h3 className="text-xl font-black leading-snug text-white">
                Dapatkan informasi terbaru dari MES Jawa Barat
              </h3>
              <p className="mt-3 text-sm leading-7 text-green-100">
                Berlangganan newsletter untuk update program terbaru, ekonomi syariah, UMKM halal, dan agenda MES.
              </p>
            </div>

            {/* BAGIAN FORM DAN NOTIFIKASI */}
            <div className="flex w-full flex-col gap-2 lg:max-w-xl">
              <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  className="h-14 w-full rounded-2xl border border-white/20 bg-white px-5 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400 transition"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-14 whitespace-nowrap rounded-2xl bg-yellow-500 px-7 text-sm font-bold text-white transition hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Memproses...' : 'Berlangganan'}
                </button>
              </form>

              {/* Umpan Balik Status Sukses */}
              {status === 'success' && (
                <p className="text-yellow-400 text-xs font-semibold mt-1 animate-pulse">
                  🎉 Terima kasih! Email Anda berhasil terdaftar di sistem Google Sheets kami.
                </p>
              )}

              {/* Umpan Balik Status Gagal */}
              {status === 'error' && (
                <p className="text-red-400 text-xs font-semibold mt-1">
                  ❌ Terjadi kesalahan pengiriman. Silakan periksa koneksi atau coba lagi nanti.
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}