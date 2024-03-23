import { inject } from '@angular/core';
import { AlertService } from '@services/alert/alert.service';
import { AlertProps } from '@type/types';
import { type ClassValue, clsx } from 'clsx';
import { GraphQLError } from 'graphql';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

