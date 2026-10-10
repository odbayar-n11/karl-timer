import { formatTime } from "@/lib/format";

interface Props {
  totalPlanned: number;
  totalUsed: number;
  modeLabel: string;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#720314]/20 bg-white p-5 shadow-sm">
      <div className="text-sm text-[#720314]/70">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}

export default function SummaryStats({
  totalPlanned,
  totalUsed,
  modeLabel,
}: Props) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      <Stat label="Нийт төлөвлөсөн хугацаа" value={formatTime(totalPlanned)} />
      <Stat label="Нийт ашигласан хугацаа" value={formatTime(totalUsed)} />
      <Stat label="Цагийн горим" value={modeLabel} />
    </div>
  );
}
