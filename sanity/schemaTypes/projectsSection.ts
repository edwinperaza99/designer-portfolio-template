import { defineType, defineField } from "sanity";

export const projectsSection = defineType({
	name: "projectsSection",
	title: "Projects Section",
	type: "document",
	fields: [
		defineField({
			name: "projects",
			title: "Projects",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "project" }],
				},
			],
			options: {
				sortable: true,
			},
		}),
	],
	preview: {
		select: {
			projects: "projects",
		},
		prepare(selection: { projects?: unknown[] }) {
			const count = Array.isArray(selection.projects)
				? selection.projects.length
				: 0;

			return {
				title: "Projects Section",
				subtitle: `${count} project${count === 1 ? "" : "s"} selected`,
			};
		},
	},
});
