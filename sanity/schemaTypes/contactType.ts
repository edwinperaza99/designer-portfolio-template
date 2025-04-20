import { defineField, defineType } from "sanity";

export const contactType = defineType({
	name: "contact",
	title: "Contact Section",
	type: "document",
	description:
		"In order to receive emails from your contact form, you will need to navigate to the following website https://web3forms.com/ from there create and access token and provide that here.",
	fields: [
		defineField({
			name: "title",
			title: "Form Title",
			type: "string",
			initialValue: "CONTACT",
			description:
				"Title for the contact form. This will be displayed above the form. (e.g., Contact)",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "email",
			title: "Email",
			type: "string",
			description: "The email address to display",
		}),
		defineField({
			name: "accessToken",
			title: "Access Token",
			type: "string",
			description:
				"The access token for Web3Forms. This is required to send emails from the contact form.",
			validation: (Rule) => Rule.required(),
		}),
	],
});
