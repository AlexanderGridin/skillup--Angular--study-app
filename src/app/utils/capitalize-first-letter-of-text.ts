export function capitalizeFirstLetterOfText(text: string): string {
  let firstLetterOfText: string = text.trim()[0].toUpperCase();
  return `${firstLetterOfText}${text.slice(1)}`;
}
