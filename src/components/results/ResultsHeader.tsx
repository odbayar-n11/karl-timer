interface Props {
  affirmativeName: string;
  negativeName: string;
}

export default function ResultsHeader({
  affirmativeName,
  negativeName,
}: Props) {
  return (
    <div className="mb-8 text-center md:text-left">
      <h1 className="text-4xl font-bold text-[#720314]">Мэтгэлцээн дууслаа</h1>
      <p className="mt-2 text-[#720314]/80 font-medium">
        {affirmativeName} эсрэг {negativeName}
      </p>
    </div>
  );
}
