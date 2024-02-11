export function niceDate(date: Date, locale?: string) {
	return date.toLocaleDateString(locale, {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})
}
