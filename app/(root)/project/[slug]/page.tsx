import ImagesGallery from "@/components/image-gallery";
import { sanityFetch } from "@/sanity/queries";
import { ProjectType } from "@/types";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import BackButton from "@/components/back-button";
import {
	MotionDiv,
	MotionH2,
	MotionH3,
	MotionSection,
} from "@/components/motion-utils";

type Slug = {
	slug: { current: string };
};

export async function generateStaticParams() {
	const projects = await sanityFetch<Slug[]>(
		`*[_type == "project" && defined(slug.current)]{ slug }`
	);

	return projects.map((p) => ({ slug: p.slug.current }));
}

type Params = Promise<{ slug: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
	const { slug } = await params;
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
		{ slug: slug }
	);

	if (!project) return notFound();

	return (
		<main className="max-w-6xl mx-auto flex flex-col justify-center container px-4">
			<MotionSection
				className="w-full mx-auto text-black bg-[#C3BBAE] text-center rounded-tl-3xl rounded-br-3xl p-4 mb-4 md:mb-6 flex flex-col justify-center max-w-3/4 md:max-w-2/3 origin-center"
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
			>
				<MotionH2
					className="text-2xl font-bold"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.4 }}
				>
					{project.title}
				</MotionH2>

				{project.author && (
					<MotionH3
						className="text-base"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.4 }}
					>
						by <span className="italic">{project.author}</span>
					</MotionH3>
				)}

				{project.details && (
					<MotionDiv
						className="mt-3 flex flex-col justify-start text-sm text-left mx-auto"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.4 }}
					>
						<PortableText value={project.details} />
					</MotionDiv>
				)}
			</MotionSection>
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
