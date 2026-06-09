//src/api/profileApi.ts
import api from "../lib/axios";

/* GET PROFILE */
export const getProfileApi = async () => {
    const response = await api.get(
        "/auth/profile/"
    );

    return response.data;
};

/* UPDATE PROFILE */
export const updateProfileApi =
    async (formData: FormData) => {

        const response =
            await api.put(
                "/auth/profile/",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

        return response.data;
    };