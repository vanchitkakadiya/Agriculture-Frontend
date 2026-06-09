import {
    useEffect,
    useState,
} from "react";

import {
    getHomeCms,
} from "../api/cmsApi";

import type {
    HomeCmsResponse,
} from "../types/home";

export const useHomeCms =
    () => {

        const [
            data,
            setData,
        ] =
            useState<HomeCmsResponse | null>(
                null
            );

        const [
            loading,
            setLoading,
        ] = useState(true);

        const [
            error,
            setError,
        ] = useState("");

        useEffect(() => {

            const fetchData =
                async () => {

                    try {

                        setLoading(
                            true
                        );

                        const response =
                            await getHomeCms();

                        setData(
                            response
                        );

                    } catch (
                        err
                    ) {

                        setError(
                            "Failed to load home page"
                        );

                    } finally {

                        setLoading(
                            false
                        );
                    }
                };

            fetchData();

        }, []);

        return {
            data,
            loading,
            error,
        };
    };