export function compareStringsCaseInsensitive(
  stringForComparing: string,
  ...strings: string[]
): boolean {
  for (let string of strings) {
    if (string.toLowerCase() !== stringForComparing.toLowerCase()) {
      return false;
    }
  }

  return true;
}
