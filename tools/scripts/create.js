const fs = require('node:fs')
const { z } = require('zod')

function getData() {
	const [url, slug, ...title] = process.argv.slice(2)

	const parsed = z
		.object({
			url: z.string().url(),
			slug: z.string(),
			title: z.string().array(),
		})
		.transform((obj) => ({
			...obj,
			title: obj.title.join(' '),
		}))
		.safeParse({ url, slug, title })

	if (!parsed.success) {
		console.error(`validation failed`, parsed.error)
		process.exit(1)
	}

	return parsed.data
}

const { url, title, slug } = getData()

const date = new Date()
const md = `
---
link: ${url}
title: ${title}
date: ${date.getDate()}-${date.toLocaleString('en-gb', { month: 'short' })}-${date.getFullYear()}
tags: []
---

`.trimStart()

fs.writeFileSync(`src/components/content/bookmark/${slug}.md`, md)
