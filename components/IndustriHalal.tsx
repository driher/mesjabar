"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { year: 2020, index: 60, umkm: 150, investasi: 40 },
  { year: 2021, index: 64, umkm: 165, investasi: 48 },
  { year: 2022, index: 70, umkm: 185, investasi: 60 },
  { year: 2023, index: 76, umkm: 210, investasi: 78 },
  { year: 2024, index: 82, umkm: 240, investasi: 95 },
  { year: 2025, index: 88, umkm: 275, investasi: 120 },
];

export default function IndustriHalalJabarChart() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md w-full h-[520px] flex flex-col">

      {/* TITLE */}
      <h2 className="text-lg font-bold mb-3">
        Grafik Industri Halal Jawa Barat
      </h2>

      {/* CHART */}
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="index"
              stroke="#16a34a"
              name="Halal Industry Index"
            />

            <Line
              type="monotone"
              dataKey="umkm"
              stroke="#2563eb"
              name="UMKM Halal (ribu unit)"
            />

            <Line
              type="monotone"
              dataKey="investasi"
              stroke="#f59e0b"
              name="Investasi (triliun)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SOURCE */}
      <p className="text-[10px] text-gray-400 mt-2 leading-snug">
        Sumber: Kementerian Perindustrian RI, Kementerian Koperasi & UKM, Badan Pusat Statistik (BPS), serta laporan ekonomi syariah Indonesia.
      </p>

    </div>
  );
}

