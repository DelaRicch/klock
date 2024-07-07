
import { environment } from '@environment/environment';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function googleSignIn() {
  window.location.href = environment.KLOCK_GRAPHQL_URI + "/auth/google";
}