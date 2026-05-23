"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function MarketTicker() {
  const { data } = useSWR("/api/market", fetcher, {
    refreshInterval: 300000,
  });

  if (!data) return <div>Loading...</div>;

  const list = [...data.data, ...data.data];

  return (
    <div className="overflow-hidden border-y bg-white">
      <div className="flex w-max animate-scroll gap-3 py-3">
        {list.map((item: any, i: number) => {
          const up = item.change >= 0;

          return (
            <div
              key={i}
              className={`min-w-[170px] px-4 py-3 rounded-xl border ${
                up ? "bg-emerald-50" : "bg-red-50"
              }`}
            >
              <div className="font-bold">{item.symbol}</div>
              <div className="font-mono">{item.price}</div>
              <div className={up ? "text-emerald-600" : "text-red-600"}>
                {item.change}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}