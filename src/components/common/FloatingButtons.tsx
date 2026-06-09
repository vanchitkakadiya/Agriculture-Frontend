//src/components/common/FloatingButtons.tsx
import { Briefcase, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  return (
    <>
      {/* LEFT BUTTON */}
      <button
        className="
          fixed
          bottom-6
          left-6
          bg-[#22c55e]
          text-white
          w-14
          h-14
          rounded-full
          shadow-lg
          flex
          items-center
          justify-center
          hover:scale-105
          transition
          z-50
        "
      >
        <MessageCircle />
      </button>

      {/* RIGHT BUTTON */}
      <button
        className="
          fixed
          bottom-6
          right-6
          bg-green-700
          text-white
          w-14
          h-14
          rounded-full
          shadow-lg
          flex
          items-center
          justify-center
          hover:scale-105
          transition
          z-50
        "
      >
        <Briefcase />
      </button>
    </>
  );
};

export default FloatingButtons;