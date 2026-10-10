interface Props {
  affirmativeName: string;
  negativeName: string;
}

function TeamBanner({ label, name }: { label: string; name: string }) {
  return (
    <div className="rounded-2xl border border-[#720314]/20 bg-white p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wider text-[#720314]/70">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold">{name}</div>
    </div>
  );
}

export default function TeamBanners({ affirmativeName, negativeName }: Props) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2">
      <TeamBanner label="НОТЛОГЧ ТАЛ" name={affirmativeName} />
      <TeamBanner label="НЯЦААГЧ ТАЛ" name={negativeName} />
    </div>
  );
}
