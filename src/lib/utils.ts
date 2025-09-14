import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//Page spring 
export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  total: number;
  totalPage: number;
}
