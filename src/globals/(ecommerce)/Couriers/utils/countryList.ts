export const countryList = [
  {
    value: "ad",
    label: {
      en: "Andorra"

    }
  },
  {
    value: "al",
    label: {
      en: "Albania"

    }
  },
  {
    value: "at",
    label: {
      en: "Austria"

    }
  },
  {
    value: "ba",
    label: {
      en: "Bosnia and Herzegovina"

    }
  },
  {
    value: "be",
    label: {
      en: "Belgium"

    }
  },
  {
    value: "bg",
    label: {
      en: "Bulgaria"

    }
  },
  {
    value: "by",
    label: {
      en: "Belarus"

    }
  },
  {
    value: "ch",
    label: {
      en: "Switzerland"

    }
  },
  {
    value: "cy",
    label: {
      en: "Cyprus"

    }
  },
  {
    value: "cz",
    label: {
      en: "Czech Republic"

    }
  },
  {
    value: "de",
    label: {
      en: "Germany"

    }
  },
  {
    value: "dk",
    label: {
      en: "Denmark"

    }
  },
  {
    value: "ee",
    label: {
      en: "Estonia"

    }
  },
  {
    value: "es",
    label: {
      en: "Spain"

    }
  },
  {
    value: "fi",
    label: {
      en: "Finland"

    }
  },
  {
    value: "fr",
    label: {
      en: "France"

    }
  },
  {
    value: "gb",
    label: {
      en: "United Kingdom"

    }
  },
  {
    value: "gr",
    label: {
      en: "Greece"

    }
  },
  {
    value: "hr",
    label: {
      en: "Croatia"

    }
  },
  {
    value: "hu",
    label: {
      en: "Hungary"

    }
  },
  {
    value: "ie",
    label: {
      en: "Ireland"

    }
  },
  {
    value: "is",
    label: {
      en: "Iceland"

    }
  },
  {
    value: "it",
    label: {
      en: "Italy"

    }
  },
  {
    value: "li",
    label: {
      en: "Liechtenstein"

    }
  },
  {
    value: "lt",
    label: {
      en: "Lithuania"

    }
  },
  {
    value: "lu",
    label: {
      en: "Luxembourg"

    }
  },
  {
    value: "lv",
    label: {
      en: "Latvia"

    }
  },
  {
    value: "mc",
    label: {
      en: "Monaco"

    }
  },
  {
    value: "md",
    label: {
      en: "Moldova"

    }
  },
  {
    value: "me",
    label: {
      en: "Montenegro"

    }
  },
  {
    value: "mk",
    label: {
      en: "North Macedonia"

    }
  },
  {
    value: "mt",
    label: {
      en: "Malta"

    }
  },
  {
    value: "nl",
    label: {
      en: "Netherlands"

    }
  },
  {
    value: "no",
    label: {
      en: "Norway"

    }
  },
  {
    value: "pl",
    label: {
      en: "Poland"

    }
  },
  {
    value: "pt",
    label: {
      en: "Portugal"

    }
  },
  {
    value: "ro",
    label: {
      en: "Romania"

    }
  },
  {
    value: "rs",
    label: {
      en: "Serbia"

    }
  },
  {
    value: "ru",
    label: {
      en: "Russia"

    }
  },
  {
    value: "se",
    label: {
      en: "Sweden"

    }
  },
  {
    value: "si",
    label: {
      en: "Slovenia"

    }
  },
  {
    value: "sk",
    label: {
      en: "Slovakia"

    }
  },
  {
    value: "sm",
    label: {
      en: "San Marino"

    }
  },
  {
    value: "ua",
    label: {
      en: "Ukraine"

    }
  },
  {
    value: "va",
    label: {
      en: "Vatican City"

    }
  },
] as const;

export type Country = (typeof countryList)[number]["value"];
