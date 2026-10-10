"use client";

interface Props {
  modeLabel: string;
  affirmativeName: string;
  negativeName: string;
  onSound: () => void;
  onReset: () => void;
}

export default function DebateHeader({
  modeLabel,
  affirmativeName,
  negativeName,
  onSound,
  onReset,
}: Props) {
  return (
    <header className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <div className="text-sm text-[#720314]/70 font-medium">{modeLabel}</div>
        <h1 className="text-3xl font-bold text-[#720314]">
          {affirmativeName} <span className="opacity-50">vs</span>{" "}
          {negativeName}
        </h1>
      </div>

      <div className="flex gap-3">

        <button
          onClick={onReset}
          className="rounded-xl border border-[#720314]/30 bg-white px-4 py-3 hover:bg-[#720314]/10 transition font-semibold"
        >
          Дахин эхлэх
        </button>
      </div>
    </header>
  );
}
