export interface ContactFormProps {
	title: string;
	accessToken: string;
}

export type Project = {
	_id: string;
	_createdAt: string;
	title: string;
	author?: string;
	details?: {
		label: string;
		value: string;
	}[];
	images?: {
		_key: string;
		asset: {
			_ref: string;
			_type: "reference";
		};
		alt?: string;
		credit?: string;
	}[];
};

export interface ImageData {
	asset: {
		_id: string;
		url: string;
	};
	alt?: string;
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
