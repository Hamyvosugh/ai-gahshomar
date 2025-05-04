
// lib/utils.ts
export function cn(...classNames: (string | boolean | undefined | null)[]): string {
    return classNames.filter(Boolean).join(' ');
  }
  
  export function formatReadingTime(minutes: number): string {
    return `${minutes} دقیقه خواندن`;
  }
  
  export function truncateText(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  }
  