import { defineType, defineField } from "sanity";

export const about = defineType({
	name: "about",
	title: "About",
	type: "document",
	fields: [
		defineField({
			name: "resumeSectionTitle",
			title: "Resume Section Title",
			type: "string",
			initialValue: "Resume",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "resumeDescription",
			title: "Resume Description",
			type: "string",
			initialValue: "Click download to view my resume",
		}),
		defineField({
			name: "resumeFile",
			title: "Resume File",
			type: "file",
			description: "Upload a PDF of your resume",
			options: {
				accept: ".pdf",
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "myStoryTitle",
			title: "Story Section Title",
			type: "string",
			initialValue: "My story",
		}),
		defineField({
			name: "myStory",
			title: "My Story",
			type: "array",
			of: [{ type: "block" }],
			validation: (Rule) => Rule.required(),
		}),
	],
});
