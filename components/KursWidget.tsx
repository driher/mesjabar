"use client";

import { useEffect, useState } from "react";

export default function KursScrollTable() {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const res = await fetch("/api/kurs");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderRow = (code: string) => (
    <tr key={code} className="border-b">
      <td className="py-2 font-medium">{code}</td>
      <td className="py-2">
        Rp {data?.[code]?.toLocaleString("id-ID") ?? "-"}
      </td>
    </tr>
  );

  const currencies = [
    "USD","EUR","SAR","JPY","AUD","GBP","SGD","MYR",
    "THB","KRW","CNY","INR","CHF","CAD"
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md w-full max-w-lg">

      <h2 className="text-lg font-bold mb-3">
        Kurs Rupiah (Global Forex)
      </h2>

      {/* SCROLL AREA */}
      <div className="max-h-80 overflow-y-auto border rounded-lg">

        <table className="w-full text-sm">
          <tbody>
            {currencies.map(renderRow)}
          </tbody>
        </table>

      </div>

      {/* SOURCE */}
      <p className="text-[10px] text-gray-400 mt-3">
        Sumber: Open Exchange Rate (market forex global)
      </p>

    </div>
  );
}