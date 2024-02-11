import { defineCollection, reference, z } from 'astro:content'

const collectionTag = defineCollection({
	type: 'content',
	schema: z.strictObject({
		//
	}),
})

const collectionBookmark = defineCollection({
	type: 'content',
	schema: z.strictObject({
		link: z.string().url(),
		title: z.string(),
		date: z.coerce.date(),
		tags: reference('tag').array().optional()
	}),
})

export const collections = {
	tag: collectionTag,
	bookmark: collectionBookmark,
}
