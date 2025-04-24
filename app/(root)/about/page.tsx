import { Button } from "@/components/ui/button";
import components from "@/components/portable-text-component";
import { PortableText } from "@portabletext/react";
import { getAboutData } from "@/sanity/queries";
import Link from "next/link";
import NoData from "@/components/no-data";

export default async function About() {
	const data = await getAboutData();
	if (!data) {
		return <NoData />;
	}

	return (
		<>
			<main className="max-w-6xl mx-auto">
				<section className="container mx-auto px-4 mb-10">
					<div className="flex justify-center items-center">
						<div className="bg-[#9e876f] h-1 w-full"></div>
						<h2 className="text-4xl px-2 uppercase">{data.resumeTitle}</h2>
						<div className="bg-[#9e876f] h-1 w-full"></div>
					</div>
					<p className="text-center pt-4 pb-2 text-[#9e876f]">
						{data.resumeDescription}
					</p>
					<div className="flex justify-center">
						<Button
							className="rounded-full text-3xl"
							size="lg"
							variant="download"
							asChild
						>
							<Link
								href={data.resumeFile.asset.url}
								className="px-12 py-8 text-lg"
								target="_blank"
								rel="noopener noreferrer"
							>
								{data.buttonText}
							</Link>
						</Button>
					</div>
				</section>
				<section className="container mx-auto px-4">
					<div className="flex justify-center items-center">
						<div className="bg-[#9e876f] h-1 w-full"></div>
						<h2 className="text-4xl px-2 uppercase whitespace-nowrap">
							{data.aboutTitle}
						</h2>
						<div className="bg-[#9e876f] h-1 w-full"></div>
					</div>
					<div className="px-4 sm:px-6 md:px-10 pt-4">
						{data.aboutDescription && (
							<PortableText
								value={data.aboutDescription}
								components={components}
							/>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
