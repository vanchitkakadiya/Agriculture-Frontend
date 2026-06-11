// src/components/support/ContactForm.tsx

import {
    useState,
} from "react";

import {
    sendSupportMessage,
} from "../../api/supportApi";

import {
    tr,
} from "../../utils/language";
import {useTranslation} from "react-i18next";

const ContactForm = () => {
    useTranslation()

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            mobile_number: "",
            subject: "",
            message: "",
        });

    const [
        attachment,
        setAttachment,
    ] = useState<File | null>(
        null
    );

    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState("");

    const [error, setError] =
        useState("");

    // =========================
    // HANDLE CHANGE
    // =========================
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        setForm({
            ...form,
            [e.target.name]:
            e.target.value,
        });
    };

    // =========================
    // SUBMIT
    // =========================
    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        try {

            setLoading(true);

            const response = await sendSupportMessage(
                {
                    ...form,
                    attachment,
                }
            );

            console.log(
                "SUPPORT RESPONSE:",
                response
            );

            // SUCCESS
            if (response?.success) {

                setSuccess(
                    response.message
                );

                setForm({
                    name: "",
                    email: "",
                    mobile_number: "",
                    subject: "",
                    message: "",
                });

                setAttachment(null);

                return;
            }

            // FAILED
            setError(
                response?.message ||
                tr("support_form.error")
            );

        } catch (err: any) {

            console.error(
                "SUPPORT ERROR:",
                err
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                tr("support_form.error")
            );
        } finally {

            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="
            bg-white
            rounded-3xl
            border
            border-[#ddd8ca]
            p-5
            sm:p-7
        "
        >

            {/* ROW */}
            <div
                className="
                grid
                md:grid-cols-2
                gap-5
            "
            >

                {/* NAME */}
                <div>

                    <label
                        className="
                        font-semibold
                        block
                        mb-2
                    "
                    >
                        {tr(
                            "support_form.name"
                        )}
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={
                            form.name
                        }
                        onChange={
                            handleChange
                        }
                        required
                        placeholder={tr(
                            "support_form.name_placeholder"
                        )}
                        className="
                        w-full
                        rounded-2xl
                        border
                        border-gray-200
                        px-4
                        py-3
                        outline-none
                        focus:border-green-600
                        focus:ring-2
                        focus:ring-green-100
                    "
                    />

                </div>

                {/* EMAIL */}
                <div>

                    <label
                        className="
                        font-semibold
                        block
                        mb-2
                    "
                    >
                        {tr(
                            "support_form.email"
                        )}
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={
                            form.email
                        }
                        onChange={
                            handleChange
                        }
                        required
                        placeholder={tr(
                            "support_form.email_placeholder"
                        )}
                        className="
                        w-full
                        rounded-2xl
                        border
                        border-gray-200
                        px-4
                        py-3
                        outline-none
                        focus:border-green-600
                        focus:ring-2
                        focus:ring-green-100
                    "
                    />

                </div>

            </div>

            {/* MOBILE */}
            <div className="mt-5">

                <label
                    className="
                    font-semibold
                    block
                    mb-2
                "
                >
                    {tr(
                        "support_form.mobile"
                    )}
                </label>

                <input
                    type="tel"
                    name="mobile_number"
                    value={
                        form.mobile_number
                    }
                    onChange={
                        handleChange
                    }
                    required
                    placeholder={tr(
                        "support_form.mobile_placeholder"
                    )}
                    className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                "
                />

            </div>

            {/* SUBJECT */}
            <div className="mt-5">

                <label
                    className="
                    font-semibold
                    block
                    mb-2
                "
                >
                    {tr(
                        "support_form.subject"
                    )}
                </label>

                <input
                    type="text"
                    name="subject"
                    value={
                        form.subject
                    }
                    onChange={
                        handleChange
                    }
                    required
                    placeholder={tr(
                        "support_form.subject_placeholder"
                    )}
                    className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                "
                />

            </div>

            {/* MESSAGE */}
            <div className="mt-5">

                <label
                    className="
                    font-semibold
                    block
                    mb-2
                "
                >
                    {tr(
                        "support_form.message"
                    )}
                </label>

                <textarea
                    name="message"
                    value={
                        form.message
                    }
                    onChange={
                        handleChange
                    }
                    rows={6}
                    required
                    placeholder={tr(
                        "support_form.message_placeholder"
                    )}
                    className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    outline-none
                    resize-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                "
                />

            </div>

            {/* ATTACHMENT */}
            <div className="mt-5">

                <label
                    className="
                    font-semibold
                    block
                    mb-2
                "
                >
                    {tr(
                        "support_form.attachment"
                    )}
                </label>

                <input
                    type="file"
                    onChange={(
                        e
                    ) =>
                        setAttachment(
                            e.target
                                .files?.[0] ||
                            null
                        )
                    }
                    className="
                    w-full
                    text-sm
                "
                />

            </div>

            {/* SUCCESS */}
            {success && (
                <div
                    className="
                    mt-5
                    bg-green-50
                    text-green-700
                    border
                    border-green-200
                    rounded-xl
                    px-4
                    py-3
                "
                >
                    {success}
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div
                    className="
                    mt-5
                    bg-red-50
                    text-red-600
                    border
                    border-red-200
                    rounded-xl
                    px-4
                    py-3
                "
                >
                    {error}
                </div>
            )}

            {/* BUTTON */}
            <button
                type="submit"
                disabled={
                    loading
                }
                className="
                mt-6
                w-full
                sm:w-auto
                bg-green-700
                hover:bg-green-800
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                transition
                disabled:bg-gray-400
            "
            >
                {loading
                    ? tr(
                        "support_form.sending"
                    )
                    : tr(
                        "support_form.send_message"
                    )}
            </button>

        </form>
    );
};

export default ContactForm;