import Image from "next/image";

export const StartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Image
        onClick={onClick}
        src="/StartButton.png"
        alt="Start Button"
        width={200}
        height={50}
        priority
        className="cursor-pointer"
      />
    </div>
  );
};
