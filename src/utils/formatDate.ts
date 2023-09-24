type Locale = "us" | "pt";

export default function formatDate(
  date: Date,
  locale: Locale,
  keepSlash?: boolean
) {
  let formattedDate = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);

  if (!keepSlash) {
    formattedDate = formattedDate.replaceAll("/", "-");
  }

  return formattedDate;
}
