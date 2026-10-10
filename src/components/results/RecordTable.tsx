import { formatTime } from "@/lib/format";
import type { TimeRecord } from "@/lib/types";

interface Props {
  heading: string;
  records: TimeRecord[];
}

export default function RecordTable({ heading, records }: Props) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#720314]/70 mb-2">
        {heading}
      </h3>
      <table className="w-full text-left text-sm">
        <thead className="border-b border-[#720314]/10 bg-[#720314]/5">
          <tr>
            <th className="p-2">Үе шат</th>
            <th className="p-2">Олгосон</th>
            <th className="p-2">Ашигласан</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.phaseId} className="border-t border-[#720314]/10">
              <td className="p-2 font-medium">{record.title}</td>
              <td className="p-2">{formatTime(record.allocated)}</td>
              <td className="p-2 font-mono font-bold">
                {formatTime(record.used)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
