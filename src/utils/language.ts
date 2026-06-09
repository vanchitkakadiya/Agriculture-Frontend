// src/utils/language.ts

import i18n from "../lib/i18n";

// CURRENT LANGUAGE
export const getCurrentLanguage =
    () => {

        return (
            i18n.language || "en"
        );
    };

export const tr = (
    key: string
) => {

    return i18n.t(
        key
    );
};


// GET TRANSLATED TEXT
export const getText = (
    item: any,
    key: string,
    fallback = ""
) => {

    if (!item) return fallback;

    const lang =
        getCurrentLanguage();

    console.log("lang", lang);

    const localizedKey =
        `${key}_${lang}`;

    return (
        item?.[localizedKey] ||
        item?.[`${key}_en`] ||
        fallback
    );
};