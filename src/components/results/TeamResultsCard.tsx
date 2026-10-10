import { formatTime } from "@/lib/format";
import { sumUsed } from "@/lib/results";
import type { TimeRecord } from "@/lib/types";
import RecordTable from "./RecordTable";

interface Props {
  name: string;
  roleLabel: string; // "Нотлогч" | "Няцаагч"
  speeches: TimeRecord[];
  crosses: TimeRecord[];
}

export default function TeamResultsCard({
  name,
  roleLabel,
  speeches,
  crosses,
}: Props) {
  const total = sumUsed([...speeches, ...crosses]);

  return (
    <div className="rounded-2xl border border-[#720314]/20 bg-white shadow-sm overflow-hidden">
      <div className="bg-[#720314] p-4 text-white font-bold text-lg flex justify-between items-center">
        <span>
          {name} ({roleLabel})
        </span>
        <span className="text-xs bg-white/20 px-2.5 py-1 rounded-md">
          Нийт: {formatTime(total)}
        </span>
      </div>

      <div className="p-4 space-y-6">
        <RecordTable heading="Илтгэлүүд (1, 2, 3-р гишүүн)" records={speeches} />
        <RecordTable
          heading="Солбисон асуултууд (3, 1-р гишүүн)"
          records={crosses}
        />
      </div>
    </div>
  );
}
