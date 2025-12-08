export type Locale = (typeof locales)[number];

export const locales = [ "en","hr","pl"] as const;
export const defaultLocale: Locale = "pl";
