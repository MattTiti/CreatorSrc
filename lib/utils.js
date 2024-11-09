import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string) {
  if (!string) return ""; // Handle empty strings or undefined
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatCurrency(value) {
  if (value >= 1000) {
    const formatted = (value / 1000).toFixed(1);
    // Remove .0 if it exists
    const simplified = formatted.endsWith(".0")
      ? formatted.slice(0, -2)
      : formatted;
    return `$${simplified}K`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function validateUsername(username) {
  // Must be 3-30 characters long
  if (username.length < 3 || username.length > 30) {
    return "Username must be between 3 and 30 characters";
  }

  // Must be lowercase
  if (username !== username.toLowerCase()) {
    return "Username must be lowercase";
  }

  // Only allow lowercase letters, numbers, underscores, and hyphens
  if (!/^[a-z0-9_-]+$/.test(username)) {
    return "Username can only contain lowercase letters, numbers, underscores, and hyphens";
  }

  // No consecutive hyphens or underscores
  if (/[-_]{2,}/.test(username)) {
    return "Username cannot contain consecutive hyphens or underscores";
  }

  return null; // Return null if validation passes
}
