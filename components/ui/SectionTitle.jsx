export default function SectionTitle({
  title,
  subtitle,
  align = "left",
}) {
  return (
    <div className={`mb-6 ${align === "center" ? "text-center" : ""}`}>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}