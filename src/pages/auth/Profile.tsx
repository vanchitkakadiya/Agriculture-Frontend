import {
    useEffect,
    useState,
} from "react";

import {useTranslation}
    from "react-i18next";

import AuthInput
    from "../../components/auth/AuthInput";

import {
    getProfileApi,
    updateProfileApi,
} from "../../api/profileApi";

const Profile = () => {

    const {t} = useTranslation();

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [fieldErrors,
        setFieldErrors] =
        useState<any>({});

    const [form, setForm] =
        useState({
            full_name: "",

            mobile_number: "",

            email: "",

            preferred_language: "en",

            address: "",

            city: "",

            state: "",

            pincode: "",

            farming_interest: "",
        });

    /* LOAD PROFILE */
    useEffect(() => {

        const fetchProfile =
            async () => {

                try {

                    setLoading(true);

                    const response =
                        await getProfileApi();

                    const data =
                        response.data;

                    setForm({
                        full_name:
                            data.full_name || "",

                        mobile_number:
                            data.mobile_number || "",

                        email:
                            data.email || "",

                        preferred_language:
                            data.preferred_language || "en",

                        address:
                            data.profile?.address || "",

                        city:
                            data.profile?.city || "",

                        state:
                            data.profile?.state || "",

                        pincode:
                            data.profile?.pincode || "",

                        farming_interest:
                            data.profile?.farming_interest || "",
                    });

                } catch (err) {

                    console.log(
                        "PROFILE ERROR:",
                        err
                    );

                } finally {

                    setLoading(false);
                }
            };

        fetchProfile();

    }, []);

    /* INPUT CHANGE */
    const handleChange = (
        e:
            React.ChangeEvent<HTMLInputElement>
            |
            React.ChangeEvent<HTMLSelectElement>
    ) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });

        /* CLEAR FIELD ERROR */
        setFieldErrors({
            ...fieldErrors,
            [e.target.name]: "",
        });
    };

    /* UPDATE PROFILE */
    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {

            e.preventDefault();

            try {

                setSaving(true);

                setMessage("");

                setError("");

                setFieldErrors({});

                const formData =
                    new FormData();

                formData.append(
                    "full_name",
                    form.full_name
                );

                formData.append(
                    "mobile_number",
                    form.mobile_number
                );

                formData.append(
                    "preferred_language",
                    form.preferred_language
                );

                formData.append(
                    "address",
                    form.address
                );

                formData.append(
                    "city",
                    form.city
                );

                formData.append(
                    "state",
                    form.state
                );

                formData.append(
                    "pincode",
                    form.pincode
                );

                formData.append(
                    "farming_interest",
                    form.farming_interest
                );

                const response =
                    await updateProfileApi(
                        formData
                    );

                setMessage(
                    response.message ||
                    "Profile updated successfully"
                );

            } catch (err: any) {

                console.log(
                    "UPDATE ERROR:",
                    err
                );

                /* FIELD ERRORS */
                if (
                    err?.response?.data?.errors
                ) {

                    setFieldErrors(
                        err.response.data.errors
                    );
                }

                setError(
                    err?.response?.data?.message ||
                    "Profile update failed"
                );

            } finally {

                setSaving(false);
            }
        };

    const cropOptions = [
        "wheat",
        "rice",
        "cotton",
        "groundnut",
        "sugarcane",
        "maize",
        "bajra",
        "vegetables",
        "fruits",
        "organic",
        "dairy",
        "greenhouse",
        "flower",
    ];

    if (loading) {
        return (
            <div className="
                min-h-screen
                flex
                items-center
                justify-center
            ">
                Loading...
            </div>
        );
    }

    return (
        <div className="
            min-h-screen
            bg-[#f5f3ed]
            py-10
            px-4
        ">
            <div className="
                max-w-4xl
                mx-auto
            ">

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    overflow-hidden
                ">

                    {/* HEADER */}
                    <div className="
                        bg-green-700
                        px-8
                        py-8
                        text-white
                    ">
                        <h1 className="
                            text-3xl
                            font-bold
                        ">
                            {t("profile.title")}
                        </h1>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-8"
                    >

                        {/* SUCCESS */}
                        {message && (
                            <div className="
                                mb-6
                                bg-green-100
                                text-green-700
                                px-4
                                py-3
                                rounded-xl
                            ">
                                {message}
                            </div>
                        )}

                        {/* ERROR */}
                        {error && (
                            <div className="
                                mb-6
                                bg-red-100
                                text-red-700
                                px-4
                                py-3
                                rounded-xl
                            ">
                                {error}
                            </div>
                        )}

                        {/* PERSONAL */}
                        <div className="mb-10">

                            <h2 className="
                                text-xl
                                font-semibold
                                mb-6
                            ">
                                Personal Info
                            </h2>

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-6
                            ">

                                {/* FULL NAME */}
                                <div>
                                    <AuthInput
                                        label="Full Name"
                                        name="full_name"
                                        value={form.full_name}
                                        onChange={handleChange}
                                    />

                                    {
                                        fieldErrors.full_name && (
                                            <p className="
                                                text-red-500
                                                text-sm
                                                mt-1
                                            ">
                                                {
                                                    fieldErrors.full_name[0]
                                                }
                                            </p>
                                        )
                                    }
                                </div>

                                {/* MOBILE */}
                                <div>
                                    <AuthInput
                                        label="Mobile"
                                        name="mobile_number"
                                        value={form.mobile_number}
                                        onChange={handleChange}
                                    />

                                    {
                                        fieldErrors.mobile_number && (
                                            <p className="
                                                text-red-500
                                                text-sm
                                                mt-1
                                            ">
                                                {
                                                    fieldErrors.mobile_number[0]
                                                }
                                            </p>
                                        )
                                    }
                                </div>

                                {/* EMAIL */}
                                <AuthInput
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />

                                {/* LANGUAGE */}
                                <div>

                                    <label className="
                                        block
                                        mb-2
                                        font-medium
                                    ">
                                        Language
                                    </label>

                                    <select
                                        name="preferred_language"
                                        value={
                                            form.preferred_language
                                        }
                                        onChange={handleChange}
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            outline-none
                                        "
                                    >
                                        <option value="en">
                                            English
                                        </option>

                                        <option value="hi">
                                            Hindi
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* ADDRESS */}
                        <div className="mb-10">

                            <h2 className="
                                text-xl
                                font-semibold
                                mb-6
                            ">
                                Address Info
                            </h2>

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-6
                            ">

                                <div className="
                                    md:col-span-2
                                ">
                                    <AuthInput
                                        label="Address"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                    />
                                </div>

                                <AuthInput
                                    label="City"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                />

                                <AuthInput
                                    label="State"
                                    name="state"
                                    value={form.state}
                                    onChange={handleChange}
                                />

                                <AuthInput
                                    label="Pincode"
                                    name="pincode"
                                    value={form.pincode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* FARMING */}
                        <div className="mb-10">

                            <h2 className="
                                text-xl
                                font-semibold
                                mb-6
                            ">
                                Farming Info
                            </h2>

                            <div>

                                <label className="
                                    block
                                    mb-2
                                    font-medium
                                ">
                                    Farming Interest
                                </label>

                                <select
                                    name="farming_interest"
                                    value={
                                        form.farming_interest
                                    }
                                    onChange={handleChange}
                                    className="
                                        w-full
                                        border
                                        border-gray-300
                                        rounded-xl
                                        px-4
                                        py-3
                                        outline-none
                                    "
                                >

                                    <option value="">
                                        Select Crop
                                    </option>

                                    {
                                        cropOptions.map(
                                            (crop) => (
                                                <option
                                                    key={crop}
                                                    value={crop}
                                                >
                                                    {crop}
                                                </option>
                                            )
                                        )
                                    }

                                </select>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                bg-green-700
                                hover:bg-green-800
                                text-white
                                px-8
                                py-3
                                rounded-xl
                                disabled:bg-gray-400
                            "
                        >
                            {
                                saving
                                    ? "Updating..."
                                    : "Update Profile"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;