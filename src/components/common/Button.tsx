import type {ButtonHTMLAttributes} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

const Button = ({ title, ...props }: Props) => {
  return (
    <button
      {...props}
      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition"
    >
      {title}
    </button>
  );
};

export default Button;