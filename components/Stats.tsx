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
    <div className="relative -mt-10 z-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition"
              >
                <Icon className="text-green-700 mb-2" size={22} />

                <div className="text-xl font-bold text-gray-800">
                  {item.value}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  {item.label}
                </div>

                <div className="text-xs text-green-700 mt-2 font-medium cursor-pointer">
                  Lihat detail →
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}