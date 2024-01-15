import { formatDistanceToNow, format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (date: string | Date) => {
  let parsedDate: Date;
  if (typeof date === "string") {
    parsedDate = parseISO(date);
  } else {
    parsedDate = date;
  }
  return format(parsedDate, "MMM dd, yyyy");
};

export const formatRelativeTime = (date: string | Date) => {
  let parsedDate: Date;
  if (typeof date === "string") {
    parsedDate = parseISO(date);
  } else {
    parsedDate = date;
  }
  return formatDistanceToNow(parsedDate, { locale: fr, addSuffix: true });
};
