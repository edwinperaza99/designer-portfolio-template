import { client } from "@/sanity/lib/client";
import { ProjectType, SettingsType } from "@/types";

export function sanityFetch<
	T,
	Params extends Record<string, unknown> = Record<string, never>,
>(
	query: string,
	params?: Params,
	options?: {
		revalidate?: number | false;
	}
): Promise<T> {
	return client.fetch<T>(query, params ?? {}, {
		// set to "false" to disable revalidation
		next: { revalidate: options?.revalidate ?? 1 },
	});
}

export async function getSettings(): Promise<SettingsType> {
	return await sanityFetch<SettingsType>(
		`*[_type == "settingsSEO"][0]{
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

export async function getProjects(): Promise<ProjectType[]> {
	return await sanityFetch<ProjectType[]>(
		`*[_type == "projectsSection"][0]{
            projects[]->{
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
            }
          }`
	);
}
