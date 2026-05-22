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
            className="group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            {/* ICON WRAPPER */}
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 group-hover:bg-green-100 transition">
              <Icon size={20} />
            </div>

            {/* VALUE */}
            <div className="text-2xl font-black text-gray-800">
              {item.value}
            </div>

            {/* LABEL */}
            <div className="mt-1 text-sm text-gray-500">
              {item.label}
            </div>

            {/* subtle glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-green-50/40 to-transparent pointer-events-none" />

          </div>
        );
      })}

    </div>
  );
}