export function capitalizeFirstLetterOfEachWordInText(text: string): string {
  let words: string[] = text.split(' ');
  let capitalizedWords = words.map((word: string): string => {
    let firstLetterOfWord = word[0].toUpperCase();
    return `${firstLetterOfWord}${word.slice(1)}`;
  });

  return capitalizedWords.join(' ');
}
