/** Display price like Rs.4,050.00 PKR when currency is PKR; otherwise Intl currency. */
export function formatProductPrice(item) {
  const raw = item?.price ?? "";
  const code = item?.currency || "PKR";
  const num = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
  if (Number.isNaN(num)) return String(raw);
  if (code === "PKR") {
    return `Rs.${num.toLocaleString("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} PKR`;
  }
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
    }).format(num);
  } catch {
    return `${code} ${num.toFixed(2)}`;
  }
}
