"use client";

interface Props {
  affirmativeName: string;
  negativeName: string;
  onAffirmativeChange: (v: string) => void;
  onNegativeChange: (v: string) => void;
}

const inputClass =
  "w-full rounded-xl border border-[#720314]/30 bg-white px-4 py-4 outline-none focus:border-[#720314] focus:ring-2 focus:ring-[#720314]/20 placeholder-[#720314]/40 text-[#720314]";

export default function TeamNameInputs({
  affirmativeName,
  negativeName,
  onAffirmativeChange,
  onNegativeChange,
}: Props) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-[#720314]">
          Нотлогч талын баг
        </label>
        <input
          value={affirmativeName}
          onChange={(e) => onAffirmativeChange(e.target.value)}
          className={inputClass}
          placeholder="Нотлогч тал"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#720314]">
          Няцаагч талын баг
        </label>
        <input
          value={negativeName}
          onChange={(e) => onNegativeChange(e.target.value)}
          className={inputClass}
          placeholder="Няцаагч тал"
        />
      </div>
    </div>
  );
}
