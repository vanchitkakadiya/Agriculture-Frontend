//src/components/auth/AuthInput.tsx

type Props = {
    label: string;
    type?: string;
    name?: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    required?: boolean;
    error?: string;
};

const AuthInput = ({
                       label,
                       type = "text",
                       name,
                       value,
                       onChange,
                       required,
                       error,
                   }: Props) => {
    return (
        <div>
            {/* LABEL */}
            <label
                className="
          block
          mb-2
          font-medium
          text-[#1d1d1d]
        "
            >
                {label}
            </label>

            {/* INPUT */}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`
          w-full
          border
          rounded-xl
          px-4
          py-3
          outline-none
          transition
          ${
                    error
                        ? "border-red-500"
                        : "border-gray-300 focus:border-green-700"
                }
        `}
            />

            {/* ERROR */}
            {error && (
                <p
                    className="
            text-red-500
            text-sm
            mt-2
          "
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default AuthInput;