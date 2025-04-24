import { PortableTextBlock } from "sanity";

export interface ContactType {
	title: string;
	email?: string;
	accessToken: string;
}

export type ProjectType = {
	title: string;
	slug: {
		current: string;
	};
	author?: string;
	details?: PortableTextBlock[];
	images?: ImageData[];
};

export type ProjectPreview = {
	title: string;
	slug: {
		current: string;
	};
	image: ImageData;
};

export type ProjectPreviewType = {
	projects: ProjectPreview[];
};

export interface ImageData {
	asset: {
		_id: string;
		url: string;
		metadata: {
			lqip: string;
		};
	};
	alt?: string;
	credit?: string;
}

export type SettingsType = {
	siteTitle?: string;
	siteDescription?: string;
	applicationName?: string;
	authors?: Array<{
		name?: string;
		url?: string;
		_type: "author";
		_key: string;
	}>;
	creator?: string;
	publisher?: string;
	defaultKeywords?: Array<string>;
	openGraphUrl?: string;
	openGraphType?: string;
	openGraphLocale?: string;
	openGraphSiteName?: string;
	openGraphImages?: Array<ImageData>;
	twitterCard?: "summary_large_image" | "summary" | "player" | "app";
	twitterImages?: Array<ImageData>;
};

export type HeaderDataType = {
	title: string;
	subtitle: string;
};

export type AboutDataType = {
	resumeTitle: string;
	resumeDescription?: string;
	buttonText?: string;
	resumeFile: {
		asset: {
			url: string;
		};
	};
	aboutTitle?: string;
	aboutDescription?: Array<{
		children?: Array<{
			marks?: Array<string>;
			text?: string;
			_type: "span";
			_key: string;
		}>;
		style?: "normal" | "quote";
		listItem?: "bullet" | "number";
		markDefs?: Array<{
			href?: string;
			_type: "link";
			_key: string;
		}>;
		level?: number;
		_type: "block";
		_key: string;
	}>; // Portable Text
};
