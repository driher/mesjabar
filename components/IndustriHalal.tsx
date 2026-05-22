"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { year: "2020", index: 60, umkm: 150, investasi: 40 },
  { year: "2021", index: 64, umkm: 165, investasi: 48 },
  { year: "2022", index: 70, umkm: 185, investasi: 60 },
  { year: "2023", index: 76, umkm: 210, investasi: 78 },
  { year: "2024", index: 82, umkm: 240, investasi: 95 },
  { year: "2025", index: 88, umkm: 275, investasi: 120 },
];

export default function IndustriHalal() {
  return (
    <div className="w-full">

      <h2 className="mb-4 text-sm font-bold text-slate-800">
        Industri Halal Jabar
      </h2>

      <div className="overflow-x-auto">

        <LineChart
          width={320}
          height={260}
          data={data}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="year"
            tick={{ fontSize: 10 }}
          />

          <YAxis tick={{ fontSize: 10 }} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="index"
            stroke="#16a34a"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="umkm"
            stroke="#2563eb"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="investasi"
            stroke="#f59e0b"
            strokeWidth={3}
          />

        </LineChart>

      </div>

      <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
        Sumber: KNEKS, BPS, dan Kementerian Perindustrian
      </p>

    </div>
  );
}