import { Month } from "@/data/curriculum";

export function isMonthUnlocked(month: Month): boolean {
  const now = new Date();
  const unlockDate = new Date(month.unlockDate);
  return now >= unlockDate;
}

export function getUnlockMonthName(month: Month): string {
  const date = new Date(month.unlockDate);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function getCurrentMonthNumber(months: Month[]): number {
  let current = 0;
  for (const month of months) {
    if (isMonthUnlocked(month)) {
      current = month.number;
    }
  }
  return current;
}
