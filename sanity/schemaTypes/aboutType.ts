import { defineType, defineField } from "sanity";

export const aboutType = defineType({
	name: "about",
	title: "About",
	type: "document",
	fields: [
		defineField({
			name: "resumeTitle",
			title: "Resume Section Title",
			type: "string",
			initialValue: "Resume",
			description: "Title for the resume section",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "resumeDescription",
			title: "Resume Description",
			type: "string",
			description: "Description for the resume section",
			initialValue: "Click download to view my resume",
		}),
		defineField({
			name: "buttonText",
			title: "Button Text",
			type: "string",
			initialValue: "Download",
			description: "Text for the download button",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "resumeFile",
			title: "Resume File",
			type: "file",
			description:
				"Upload a PDF of your resume, this will be the file that is downloaded when the button is clicked.",
			options: {
				accept: ".pdf",
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "aboutTitle",
			title: "About Section Title",
			type: "string",
			initialValue: "My Story",
			description: "Title for the about section",
		}),
		defineField({
			name: "aboutDescription",
			title: "About Section Description",
			description:
				"Description for the about section. You can use the rich text editor to format your text.",
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "Quote", value: "quote" },
					],
					marks: {
						decorators: [
							{ title: "Bold", value: "strong" },
							{ title: "Italic", value: "em" },
						],
						annotations: [
							{
								name: "link",
								title: "External Link",
								type: "object",
								fields: [
									{
										name: "href",
										title: "URL",
										type: "url",
										validation: (Rule) => Rule.uri({ allowRelative: true }),
									},
								],
							},
						],
					},
				},
			],
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		prepare() {
			return {
				title: "About Section",
			};
		},
	},
});
