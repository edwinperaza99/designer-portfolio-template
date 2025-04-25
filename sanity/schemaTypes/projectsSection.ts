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
			description:
				"This section allows you to select the projects you want to display on the homepage. You can select multiple projects, and they will be displayed in a grid format. You can reorder them by dragging and dropping them in the list below. The projects will be displayed in the order you set them.",
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
