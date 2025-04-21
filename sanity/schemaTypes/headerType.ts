import { defineType, defineField } from "sanity";

export const headerType = defineType({
	name: "header",
	title: "Header",
	description: "This is the header section of the website.",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			initialValue: "Your Name",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "subtitle",
			title: "Subtitle",
			type: "string",
			initialValue: "Designer, Developer, and Creator",
		}),
	],
});
