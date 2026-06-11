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

/*
|--------------------------------------------------------------------------
| GET TRANSLATED TEXT
|--------------------------------------------------------------------------
|
| item      -> object
| key       -> field name
| nestedKey -> optional nested object field
|
|--------------------------------------------------------------------------
|
| Examples:
|
| getText(blog, "title")
|
| getText(blog, "summary")
|
| getText(blog, "category", "name")
|
| getText(blog, "category", "title")
|
|--------------------------------------------------------------------------
*/

export const getText = (

    item: any,

    key: string,

    nestedKey?: string,

    fallback = ""

) => {

    if (!item) return fallback;

    const lang =
        getCurrentLanguage();

    /*
    |--------------------------------------------------------------------------
    | NESTED OBJECT SUPPORT
    |--------------------------------------------------------------------------
    */

    if (

        nestedKey &&

        typeof item[key] === "object" &&

        item[key] !== null

    ) {

        return (

            item[key]?.[
                `${nestedKey}_${lang}`
            ] ||

            item[key]?.[
                `${nestedKey}_en`
            ] ||

            fallback
        );
    }

    /*
    |--------------------------------------------------------------------------
    | NORMAL FIELD
    |--------------------------------------------------------------------------
    */

    return (

        item?.[
            `${key}_${lang}`
        ] ||

        item?.[
            `${key}_en`
        ] ||

        fallback
    );
};