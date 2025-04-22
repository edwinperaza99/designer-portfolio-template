import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title("Designer Portfolio")
		.items([
			S.listItem()
				.title("Header")
				.child(S.document().schemaType("header").documentId("header")),

			S.listItem()
				.title("About")
				.child(S.document().schemaType("about").documentId("about")),

			S.listItem()
				.title("Contact")
				.child(S.document().schemaType("contact").documentId("contact")),

			S.divider(),

			S.listItem()
				.title("Projects Section")
				.child(
					S.document()
						.schemaType("projectsSection")
						.documentId("projectsSection")
				),

			S.documentTypeListItem("project").title("All Projects"),

			S.divider(),

			S.listItem()
				.title("Global Settings")
				.child(
					S.document().schemaType("settings").documentId("global-settings")
				),

			S.listItem()
				.title("Navigation Bar")
				.child(S.document().schemaType("navBar").documentId("navigation")),

			S.divider(),
		]);
