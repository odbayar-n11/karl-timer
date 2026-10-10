export function formatTime(seconds: number) {
  const isNegative = seconds < 0;
  const absSec = Math.abs(Math.round(seconds));
  const minutes = Math.floor(absSec / 60);
  const secs = absSec % 60;

  return `${isNegative ? "-" : ""}${minutes}:${secs.toString().padStart(2, "0")}`;
}
