const LINE_BREAK_LENGTH = 50;

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
