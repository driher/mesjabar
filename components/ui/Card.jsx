export default function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-gray-100 shadow-sm
        ${hover ? "hover:shadow-md transition duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}