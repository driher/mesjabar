"use client";

import { useEffect, useState } from "react";

export default function EmasWidget() {
  const [price, setPrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGold = async () => {
    try {
      // API alternatif (bisa diganti kalau punya API BI/Antam)
      const res = await fetch(
        "https://api.metals.live/v1/spot/gold"
      );
      const data = await res.json();

      const newPrice = data?.[0]?.price || null;

      if (newPrice) {
        setPrevPrice(price);
        setPrice(newPrice);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetch gold:", err);
    }
  };

  useEffect(() => {
    fetchGold();

    const interval = setInterval(() => {
      fetchGold();
    }, 60000); // update tiap 1 menit

    return () => clearInterval(interval);
  }, []);

  const isUp = prevPrice && price ? price > prevPrice : null;

  return (
    <div className="p-5 rounded-2xl shadow-lg bg-white border w-full max-w-sm">
      <p className="text-gray-500 text-sm">Harga Emas (Spot Gold)</p>

      {loading ? (
        <p className="text-lg font-bold mt-2">Loading...</p>
      ) : (
        <div className="mt-2">
          <p
            className={`text-3xl font-bold transition-all duration-500 ${
              isUp === null
                ? "text-black"
                : isUp
                ? "text-green-600 scale-105"
                : "text-red-600 scale-95"
            }`}
          >
            $ {price?.toFixed(2)} / oz
          </p>

          <p className="text-xs mt-1 text-gray-500">
            Update realtime setiap 1 menit
          </p>

          {isUp !== null && (
            <p
              className={`text-sm mt-2 font-medium ${
                isUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {isUp ? "▲ Naik" : "▼ Turun"} dari update sebelumnya
            </p>
          )}
        </div>
      )}
    </div>
  );
}