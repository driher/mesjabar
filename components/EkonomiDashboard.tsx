"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const kursData = [
  { month: "Jan", value: 15400 },
  { month: "Feb", value: 15600 },
  { month: "Mar", value: 15800 },
  { month: "Apr", value: 16100 },
  { month: "Mei", value: 16420 },
];

const emasData = [
  { month: "Jan", value: 1700000 },
  { month: "Feb", value: 1750000 },
  { month: "Mar", value: 1810000 },
  { month: "Apr", value: 1880000 },
  { month: "Mei", value: 1945000 },
];

const sahamData = [
  { month: "Jan", value: 210 },
  { month: "Feb", value: 218 },
  { month: "Mar", value: 224 },
  { month: "Apr", value: 232 },
  { month: "Mei", value: 238 },
];

const wisataData = [
  { month: "2021", value: 4 },
  { month: "2022", value: 6 },
  { month: "2023", value: 8 },
  { month: "2024", value: 10 },
  { month: "2025", value: 12.8 },
];

export default function EkonomiDashboard() {
  return (
    <section className="py-16 bg-[#f7faf8]">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">

          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-700">
            Dashboard Ekonomi Syariah
          </span>

          <h2 className="mt-4 text-3xl font-black text-slate-900">
            Data & Insight Ekonomi Syariah
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Informasi ekonomi syariah, investasi, dan industri halal Indonesia.
          </p>

        </div>

        {/* GRID */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* KURS */}
          <CardChart
            title="Kurs Rupiah vs USD"
            value="Rp 16.420"
            percent="-0.82%"
            percentColor="red"
            source="Bank Indonesia"
            data={kursData}
          />

          {/* EMAS */}
          <CardChart
            title="Harga Emas Indonesia"
            value="Rp 1.945.000"
            percent="+1.28%"
            percentColor="green"
            source="Antam"
            data={emasData}
          />

          {/* SAHAM */}
          <CardChart
            title="Indeks Saham Syariah"
            value="ISSI 238.12"
            percent="+0.54%"
            percentColor="green"
            source="IDX / Bursa Efek Indonesia"
            data={sahamData}
          />

          {/* WISATA */}
          <CardChart
            title="Potensi Wisata Halal Jabar"
            value="12.8 Juta"
            percent="+18%"
            percentColor="blue"
            source="Dispar Jabar & BPS"
            data={wisataData}
          />

        </div>

      </div>
    </section>
  );
}

function CardChart({
  title,
  value,
  percent,
  percentColor,
  source,
  data,
}: any) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      {/* TOP */}
      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {value}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold
          ${
            percentColor === "green"
              ? "bg-green-100 text-green-700"
              : percentColor === "red"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {percent}
        </span>

      </div>

      {/* CHART */}
      <div className="mt-6 h-64">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#15803d"
              fill="#bbf7d0"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* SOURCE */}
      <p className="mt-4 text-xs text-slate-400">
        Sumber: {source}
      </p>

    </div>
  );
}