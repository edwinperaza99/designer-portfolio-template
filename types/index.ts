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
	details?: {
		label: string;
		value: string;
	}[];
	images?: ImageData[];
};

export interface ImageData {
	asset: {
		_id: string;
		url: string;
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
