export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
