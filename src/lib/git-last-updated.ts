import { execFileSync } from "node:child_process";

/** Date of the last commit touching `filePath`, or undefined outside git. */
export function gitLastUpdated(filePath: string | undefined): Date | undefined {
  if (!filePath) return undefined;
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", filePath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}
