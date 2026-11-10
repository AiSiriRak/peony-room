export function Button({
  children,
  icon,
  className = "",
  color = "pink",
  px = "px-12",
  py = "py-2",
  disabled = false,
  hideShadow = false,
  fullRound = false,
  ...props
}) {
  const colorClass = {
    transparent: "",
    pink: "bg-primary-pink text-black",
    black: "bg-black border-2 border-black text-white",
    white: "bg-white border-2 border-black text-black",

    disablepink: "bg-dark-pink text-black",
  };

  const currentColor = disabled ? `disable${color}` : color;

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${colorClass[currentColor]} ${fullRound ? "rounded-full" : "rounded-xl"} flex items-center justify-center gap-2 ${px} ${py} text-button transition-colors ${disabled ? "cursor-not-allowed" : `cursor-pointer hover:brightness-90 hover:scale-105 active:scale-95 ${!hideShadow && "shadow-button"}`} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
