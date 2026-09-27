const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
}) => {
  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg px-5 py-2.5 font-semibold transition-all duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;