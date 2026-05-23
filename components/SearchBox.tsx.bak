"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBox({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Cari nama pakar..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-white/30 bg-white/95 px-5 py-4 text-black outline-none"
    />
  );
}