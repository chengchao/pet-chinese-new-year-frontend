import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assertValid<T>(client: T | null) {
  if (!client) {
    throw new Error("OSSClient is null or undefined");
  }
  return client;
}

export function getDifference<T>(a: T[], b: T[]) {
  const setB = new Set(b);
  return a.filter((element) => !setB.has(element));
}

export function areArraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  const diff = getDifference(a, b);
  return !diff;
}
