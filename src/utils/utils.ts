export function normalizeString(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function replaceSpacesWithUnderscore(text: string): string {
  return text.replace(/\s/g, "_");
}

export function removeUnderscoreParentheses(text: string): string {
  return text.replace(/_\(\s?/g, "");
}

export function convertToCamelCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function transformString(text): string {
  let transformedText = normalizeString(text);
  transformedText = replaceSpacesWithUnderscore(transformedText);
  transformedText = removeUnderscoreParentheses(transformedText);
  transformedText = convertToCamelCase(transformedText);
  return transformedText;
}
