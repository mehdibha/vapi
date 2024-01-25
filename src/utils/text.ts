const LINE_BREAK_LENGTH = 50;

export const truncateOnWord = (text: string, maxLength: number, ellipsis = true) => {
  if (text.length <= maxLength) return text;

  // First split on maxLength chars
  let truncatedText = text.substring(0, maxLength);

  // Then split on the last space, this way we split on the last word,
  // which looks just a bit nicer.
  truncatedText = truncatedText.substring(
    0,
    Math.min(truncatedText.length, truncatedText.lastIndexOf(" "))
  );

  if (ellipsis) truncatedText += "...";

  return truncatedText;
};
// TODO Fix this shit
export const truncate = (text: string, maxLength: number) => {
  const lines = text.split("\n");

  const textWithMaxLines = lines.slice(0, 6).join("\n");

  if (text === textWithMaxLines && text.length <= maxLength) return text;

  return `${textWithMaxLines.substring(0, maxLength)}...`;
};

export const shouldTruncate = (text: string, maxLength: number) => {
  return text.length + text.split("\n").length * (LINE_BREAK_LENGTH - 1) > maxLength;
};
