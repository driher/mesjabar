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
  { year: 2020, issi: 155, marketcap: 1200, volume: 80 },
  { year: 2021, issi: 168, marketcap: 1350, volume: 95 },
  { year: 2022, issi: 182, marketcap: 1500, volume: 110 },
  { year: 2023, issi: 195, marketcap: 1700, volume: 130 },
  { year: 2024, issi: 210, marketcap: 1950, volume: 155 },
  { year: 2025, issi: 225, marketcap: 2200, volume: 180 },
];

export default function SahamSyariahChart() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md w-full h-[420px] flex flex-col">

      {/* TITLE */}
      <h2 className="text-lg font-bold mb-3">
        Grafik Saham Syariah Indonesia
      </h2>

      {/* CHART */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="issi"
              stroke="#16a34a"
              name="ISSI Index"
            />

            <Line
              type="monotone"
              dataKey="marketcap"
              stroke="#2563eb"
              name="Market Cap (Triliun)"
            />

            <Line
              type="monotone"
              dataKey="volume"
              stroke="#f59e0b"
              name="Volume Transaksi"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SOURCE */}
      <p className="text-[10px] text-gray-400 mt-2">
        Sumber: Bursa Efek Indonesia (BEI), OJK, IDX Sharia Index (ISSI)
      </p>

    </div>
  );
}