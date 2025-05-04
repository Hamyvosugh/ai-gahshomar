/**
 * Convert English/Arabic digits to Persian digits
 */
export function toPersianDigits(input: string | number): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(input).replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
  }
  
  /**
   * Convert Persian digits to English digits
   */
  export function toGregorianDigits(input: string | number): string {
    return String(input)
      .replace(/[۰-۹]/g, (match) => {
        return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(match));
      });
  }