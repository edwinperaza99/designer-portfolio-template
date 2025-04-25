import { defineType, defineField } from "sanity";

export const projectType = defineType({
	name: "project",
	title: "Project",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "author",
			title: "By (Author)",
			type: "string",
			description: "e.g., Greg Kotis",
		}),
		defineField({
			name: "details",
			title: "Project Details",
			type: "array",
			of: [{ type: "block" }],
			description: "Write any relevant details for this project.",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			description: "Used in the URL. Automatically generated from the title.",
			options: {
				source: "title",
				maxLength: 96,
				slugify: (input: string) =>
					input
						.toLowerCase()
						.replace(/\s+/g, "-")
						.replace(/[^a-z0-9\-]/g, "")
						.slice(0, 96),
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "images",
			title: "Images",
			type: "array",
			description:
				"Upload images for this project. You can reorder them and they will be displayed in the order you set.",
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: "alt",
							title: "Alt Text",
							type: "string",
							description: "Image description for accessibility and SEO.",
						},
						{
							name: "credit",
							title: "Credit",
							type: "string",
							description: "Name of the photographer, designer, etc.",
						},
					],
				},
			],
			options: {
				layout: "grid",
			},
		}),
	],
	preview: {
		select: {
			title: "title",
			author: "author",
			media: "images.0.asset",
		},
		prepare({ title, author, media }) {
			return {
				title: title || "Untitled Project",
				subtitle: author ? `by ${author}` : "No author specified",
				media,
			};
		},
	},
});
