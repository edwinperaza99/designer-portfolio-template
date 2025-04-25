import NoData from "@/components/no-data";
import { getProjectsSection } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import { MotionArticle, MotionSection } from "@/components/motion-utils";

export default async function Home() {
	const data = await getProjectsSection();
	if (!data) {
		return <NoData />;
	}

	return (
		<main className="max-w-6xl mx-auto">
			<MotionSection
				className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto px-4 mb-10"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: 0.25,
						},
					},
				}}
			>
				{data.projects.map((project, i) => (
					<MotionArticle
						key={i}
						className="h-auto w-full group"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.4, ease: "easeOut" }}
						whileHover={{ scale: 1.015 }}
					>
						<Link href={`/project/${project.slug.current}`}>
							<div className="aspect-video relative rounded overflow-hidden">
								<Image
									src={project.image.asset.url}
									alt={project.image.alt || ""}
									className="object-cover opacity-100 group-hover:opacity-70 transition-opacity duration-300"
									fill
									blurDataURL={project.image.asset.metadata.lqip}
									placeholder="blur"
									loading="lazy"
								/>
							</div>
							<div className="text-center p-2">
								<h3 className="text-base md:text-lg text-black group-hover:text-gray-700 transition-colors">
									{project.title}
								</h3>
							</div>
						</Link>
					</MotionArticle>
				))}
			</MotionSection>
		</main>
	);
}
