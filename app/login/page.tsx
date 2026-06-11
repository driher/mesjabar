"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     AUTO REDIRECT IF ALREADY LOGGED IN
  ========================= */
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        router.push("/pakar");
      }
    };

    checkUser();

    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          router.push("/pakar");
        }
      });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  /* =========================
     EMAIL LOGIN
  ========================= */
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/pakar");
  };

  /* =========================
     REGISTER
  ========================= */
  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    alert("Registrasi berhasil! Cek email verifikasi.");
  };

  /* =========================
     GOOGLE LOGIN (FIXED FLOW)
  ========================= */
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // IMPORTANT: jangan langsung /pakar
        redirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-2xl font-black text-gray-900">
          Login Member
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Akses Direktori Pakar MES Jawa Barat
        </p>

        {/* ERROR */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* INPUT */}
        <div className="mt-6 space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* LOGIN */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {/* REGISTER */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Register
          </button>

        </div>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">Masukan email dan password, klik login atau klik register (untuk pengguna baru)</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
  
      </div>
    </div>
  );
}