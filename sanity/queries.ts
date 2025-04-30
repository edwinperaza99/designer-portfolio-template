import { client } from "@/sanity/lib/client";
import {
	AboutDataType,
	ContactType,
	HeaderDataType,
	ProjectPreviewType,
	ProjectType,
	SettingsType,
} from "@/types";

export function sanityFetch<
	T,
	Params extends Record<string, unknown> = Record<string, never>,
>(
	query: string,
	params?: Params,
	options?: {
		revalidate?: number | false;
		tags?: string[];
	}
): Promise<T> {
	return client.fetch<T>(query, params ?? {}, {
		next: {
			revalidate: options?.revalidate ?? false,
			tags: options?.tags ?? ["global-sanity"],
		},
	});
}
export async function getSettings(): Promise<SettingsType> {
	return await sanityFetch<SettingsType>(
		`*[_type == "settings"][0]{
    siteTitle,
    siteDescription,
    applicationName,
    authors[] {
      name,
      url
    },
    creator,
    publisher,
    defaultKeywords,
    openGraphUrl,
    openGraphType,
    openGraphLocale,
    openGraphSiteName,
    openGraphImages[] {
      asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    twitterCard,
    twitterImages[] {
      asset->{
        url
      },
      alt
    }
  }`
	);
}

// query for homepage
export async function getProjectsSection(): Promise<ProjectPreviewType> {
	return await sanityFetch<ProjectPreviewType>(
		`*[_id == "projectsSection"][0]{
  projects[]->{
    title,
    slug,
    "image": images[0]{
      asset->{
        url,
        metadata {
        lqip
        }
      },
        alt,
        credit
    }
  }
}`
	);
}

// query for specific project page
export async function getProjectBySlug(
	slug: string
): Promise<ProjectType | null> {
	return await sanityFetch<ProjectType, { slug: string }>(
		`*[_type == "project" && slug.current == $slug][0] {
      title,
      slug,
      author,
      details,
      images[]{
        asset->{
          url
        },
        alt,
        credit
      }
    }`,
		{ slug }
	);
}

export async function getHeaderData(): Promise<HeaderDataType> {
	return await sanityFetch<HeaderDataType>(
		`*[_id == "header"][0] {
            title,
            subtitle
        }`
	);
}

export async function getContactData(): Promise<ContactType> {
	return await sanityFetch<ContactType>(
		`*[_id == "contact"][0] {
            title,
            email,
            accessToken
        }`
	);
}

export async function getAboutData(): Promise<AboutDataType> {
	return await sanityFetch<AboutDataType>(
		`*[_type == "about"][0]{
      resumeTitle,
      resumeDescription,
      buttonText,
      resumeFile {
        asset->{
          url
        }
      },
      aboutTitle,
      aboutDescription
    }`
	);
}
