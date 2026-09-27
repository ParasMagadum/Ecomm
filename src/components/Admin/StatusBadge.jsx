const StatusBadge = ({ status }) => {
  const value = status || "Unknown";
  const color = {
    Delivered: "bg-green-50 text-green-700",
    Approved: "bg-green-50 text-green-700",
    Processing: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    Requested: "bg-amber-50 text-amber-700",
    Cancelled: "bg-red-50 text-red-700",
    Rejected: "bg-red-50 text-red-700"
  }[value] || "bg-slate-100 text-slate-600";

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>{value}</span>;
};

export default StatusBadge;