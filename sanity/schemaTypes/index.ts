import { type SchemaTypeDefinition } from "sanity";

import { projectType } from "@/sanity/schemaTypes/projectType";
import { settingsType } from "@/sanity/schemaTypes/settingsType";
import { contactType } from "@/sanity/schemaTypes/contactType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [projectType, settingsType, contactType],
};
