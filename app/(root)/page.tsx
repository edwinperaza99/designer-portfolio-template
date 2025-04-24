import NoData from "@/components/no-data";
import { getProjectsSection } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const data = await getProjectsSection();
	if (!data) {
		return <NoData />;
	}

	return (
		<main className="max-w-6xl mx-auto">
			<section className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto px-4 mb-10">
				{data.projects.map((project, i) => (
					<article key={i} className="h-auto w-full group">
						<Link href={`/project/${project.slug.current}`}>
							<div className="aspect-video relative">
								<Image
									src={project.image.asset.url}
									alt={project.image.alt || ""}
									className="object-cover opacity-100 group-hover:opacity-70"
									fill
									blurDataURL={project.image.asset.metadata.lqip}
									placeholder="blur"
									loading="lazy"
								/>
							</div>
							<div className="text-center p-2">
								<h3 className="text-base md:text-lg text-black group-hover:text-gray-700">
									{project.title}
								</h3>
							</div>
						</Link>
					</article>
				))}
			</section>
		</main>
	);
}
