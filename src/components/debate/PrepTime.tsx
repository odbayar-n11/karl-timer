"use client";

import { formatTime } from "@/lib/format";
import { PREP_USES_PER_TEAM } from "@/lib/constants";
import type { Team } from "@/lib/types";

interface Props {
  affirmativeName: string;
  negativeName: string;
  prepUsed: Record<Team, number>;
  prepTeam: Team | null;
  /** a speech / cross-examination is running, so prep can't start */
  disabled: boolean;
  onStart: (team: Team) => void;
}

/** Big timer shown in place of the main timer while a team is preparing. */
export function PrepTimer({
  teamName,
  remaining,
  onEnd,
}: {
  teamName: string;
  remaining: number;
  onEnd: () => void;
}) {
  return (
    <section className="rounded-3xl border-2 border-amber-500 bg-amber-50 p-8 text-center shadow-sm">
      <div className="text-sm font-bold uppercase tracking-widest text-amber-700">
        Бэлтгэлийн хугацаа
      </div>
      <div className="mt-1 text-lg font-medium text-[#720314]/80">
        {teamName}
      </div>

      <div
        className={`my-8 font-mono text-8xl font-black tracking-tight md:text-[10rem] ${
          remaining <= 10 ? "text-red-600" : "text-amber-700"
        }`}
      >
        {formatTime(remaining)}
      </div>

      <button
        onClick={onEnd}
        className="rounded-2xl bg-amber-600 px-12 py-5 text-xl font-bold text-white shadow-lg transition hover:bg-amber-700"
      >
        Бэлтгэл дуусгах
      </button>
    </section>
  );
}

function PrepButton({
  label,
  name,
  used,
  disabled,
  onClick,
}: {
  label: string;
  name: string;
  used: number;
  disabled: boolean;
  onClick: () => void;
}) {
  const left = PREP_USES_PER_TEAM - used;
  const noneLeft = left <= 0;

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#720314]/20 bg-white p-4 shadow-sm">
      <div className="min-w-0">
        <div className="text-xs font-bold uppercase tracking-wider text-[#720314]/70">
          {label}
        </div>
        <div className="truncate font-semibold">{name}</div>
        <div className="mt-2 flex items-center gap-1.5" aria-label={`${left} удаа үлдсэн`}>
          {Array.from({ length: PREP_USES_PER_TEAM }, (_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${
                i < left ? "bg-amber-500" : "bg-[#720314]/15"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-[#720314]/60">
            {left}/{PREP_USES_PER_TEAM} үлдсэн
          </span>
        </div>
      </div>

      <button
        onClick={onClick}
        disabled={disabled || noneLeft}
        className="shrink-0 rounded-xl border border-amber-600 px-4 py-3 font-semibold text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:border-[#720314]/15 disabled:text-[#720314]/30 disabled:hover:bg-transparent"
      >
        1 мин бэлтгэл
      </button>
    </div>
  );
}

/** Per-team prep buttons with the remaining uses. */
export default function PrepTime({
  affirmativeName,
  negativeName,
  prepUsed,
  prepTeam,
  disabled,
  onStart,
}: Props) {
  const blocked = disabled || prepTeam !== null;

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-lg font-bold">Бэлтгэлийн хугацаа</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <PrepButton
          label="НОТЛОГЧ ТАЛ"
          name={affirmativeName}
          used={prepUsed.affirmative}
          disabled={blocked}
          onClick={() => onStart("affirmative")}
        />
        <PrepButton
          label="НЯЦААГЧ ТАЛ"
          name={negativeName}
          used={prepUsed.negative}
          disabled={blocked}
          onClick={() => onStart("negative")}
        />
      </div>
      {disabled && (
        <p className="mt-2 text-sm text-[#720314]/60">
          Бэлтгэлийн хугацааг илтгэл эсвэл асуултын өмнө авна.
        </p>
      )}
    </section>
  );
}
