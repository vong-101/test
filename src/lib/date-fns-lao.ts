import type { Locale } from "date-fns";

const formatDistanceLocale: Record<string, string> = {
  lessThanXSeconds: "ໜ້ອຍກວ່າ {{count}} ວິນາທີ",
  xSeconds: "{{count}} ວິນາທີ",
  halfAMinute: "ເຄິ່ງນາທີ",
  lessThanXMinutes: "ໜ້ອຍກວ່າ {{count}} ນາທີ",
  xMinutes: "{{count}} ນາທີ",
  aboutXHours: "ປະມານ {{count}} ຊົ່ວໂມງ",
  xHours: "{{count}} ຊົ່ວໂມງ",
  xDays: "{{count}} ມື້",
  aboutXWeeks: "ປະມານ {{count}} ອາທິດ",
  xWeeks: "{{count}} ອາທິດ",
  aboutXMonths: "ປະມານ {{count}} ເດືອນ",
  xMonths: "{{count}} ເດືອນ",
  aboutXYears: "ປະມານ {{count}} ປີ",
  xYears: "{{count}} ປີ",
  overXYears: "ຫຼາຍກວ່າ {{count}} ປີ",
  almostXYears: "ເກືອບ {{count}} ປີ",
};

function formatDistance(token: string, count: number, options?: any): string {
  let result = formatDistanceLocale[token].replace("{{count}}", String(count));

  if (options?.addSuffix) {
    if (options.comparison > 0) {
      return "ໃນ " + result;
    } else {
      return result + "ກ່ອນ";
    }
  }

  return result;
}

const dateFormats: Record<string, string> = {
  full: "EEEE ທີ d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y",
};

// Lao locale object
export const lo: Locale = {
  code: "lo",
  formatDistance: formatDistance,
  formatLong: {
    date: (args: any) => dateFormats[args.width],
    time: () => "HH:mm",
    dateTime: () => "d MMM y HH:mm",
  },
  formatRelative: (token: any) => token,
  localize: {
    ordinalNumber: (n: number) => String(n),
    era: (n: number) => (n === 0 ? "ກ່ອນ ຄ.ສ." : "ຄ.ສ."),
    quarter: (n: number) => "ໄຕມາດ " + n,
    month: (n: number) => {
      const months = [
        "ມັງກອນ",
        "ກຸມພາ",
        "ມີນາ",
        "ເມສາ",
        "ພຶດສະພາ",
        "ມິຖຸນາ",
        "ກໍລະກົດ",
        "ສິງຫາ",
        "ກັນຍາ",
        "ຕຸລາ",
        "ພະຈິກ",
        "ທັນວາ",
      ];
      return months[n];
    },
    day: (n: number) => {
      const days = ["ອາທິດ", "ຈັນ", "ອັງຄານ", "ພຸດ", "ພະຫັດ", "ສຸກ", "ເສົາ"];
      return days[n];
    },
    dayPeriod: (n: any) => n,
  },
  match: {
    ordinalNumber: () => ({ value: 1, rest: "" }),
    era: () => ({ value: 1, rest: "" }),
    quarter: () => ({ value: 1, rest: "" }),
    month: () => ({ value: 1, rest: "" }),
    day: () => ({ value: 1, rest: "" }),
    dayPeriod: () => ({ value: 1, rest: "" }),
  } as any, // Minimal match implementation
  options: {
    weekStartsOn: 1, // Monday
    firstWeekContainsDate: 1,
  },
};
