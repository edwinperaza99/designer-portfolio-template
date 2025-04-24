import ImagesGallery from "@/components/image-gallery";
import { sanityFetch } from "@/sanity/queries";
import { ProjectType } from "@/types";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import BackButton from "@/components/back-button";

type Slug = {
	slug: { current: string };
};

export async function generateStaticParams() {
	const projects = await sanityFetch<Slug[]>(
		`*[_type == "project" && defined(slug.current)]{ slug }`
	);

	return projects.map((p) => ({ slug: p.slug.current }));
}

export default async function ProjectPage({
	params,
}: {
	params: { slug: string };
}) {
	const project = await sanityFetch<ProjectType, { slug: string }>(
		`*[_type == "project" && slug.current == $slug][0]{
          title,
          author,
          details,
          images[]{
            asset->{  url,
        metadata {
        lqip
        }
        },
            alt,
            credit
          }
        }`,
		{ slug: params.slug }
	);

	if (!project) return notFound();

	return (
		<main className="max-w-6xl mx-auto flex flex-col justify-center container px-4">
			<section className="w-full mx-auto text-black bg-[#C3BBAE] text-center rounded-tl-3xl rounded-br-3xl p-4 mb-4 md:mb-6 flex flex-col justify-center max-w-3/4 md:max-w-2/3">
				<h2 className="text-2xl font-bold">{project.title}</h2>
				{project.author && (
					<h3 className="text-base">
						by{" "}
						<span className="italic">{project.author || "Unknown Author"}</span>
					</h3>
				)}
				{project.details && (
					<div className="mt-3 flex flex-col justify-start text-sm text-left mx-auto">
						<PortableText value={project.details} />
					</div>
				)}
			</section>
			{/* gallery of images here  */}
			{project.images && project.images.length > 0 && (
				<section>
					<ImagesGallery images={project.images} />
				</section>
			)}
			<BackButton />
		</main>
	);
}
