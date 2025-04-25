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
			description:
				"Your name or the main title of the website. This will be displayed prominently at the top of the page and also in the footer.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "subtitle",
			title: "Subtitle",
			type: "string",
			description: "A short description or tagline.",
			initialValue: "Designer, Developer, and Creator",
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Header Section",
			};
		},
	},
});
