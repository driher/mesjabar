import {
  Users,
  UserCheck,
  GraduationCap,
  Building2,
  Handshake,
  LucideIcon,
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

const stats: StatItem[] = [
  { label: "Total Anggota", value: "4.892", icon: Users },
  { label: "Pengurus Aktif", value: "312", icon: UserCheck },
  { label: "Program Akademi", value: "28", icon: GraduationCap },
  { label: "Kota / Kabupaten", value: "27", icon: Building2 },
  { label: "Mitra Strategis", value: "86", icon: Handshake },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition hover:shadow-lg"
          >

            <Icon
              className="mb-3 text-green-700"
              size={24}
            />

            <div className="text-2xl font-black text-gray-800">
              {item.value}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              {item.label}
            </div>

          </div>
        );
      })}

    </div>
  );
}