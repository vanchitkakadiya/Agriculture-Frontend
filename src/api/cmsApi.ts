// src/api/cmsApi.ts


import api from "../lib/axios.ts";

export const getHomeCms =
    async () => {

        const response =
            await api.get(
                "/cms/home/"
            );

        return response.data.data;
    };