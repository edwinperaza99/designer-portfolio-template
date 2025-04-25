import { Button } from "@/components/ui/button";
import components from "@/components/portable-text-component";
import { PortableText } from "@portabletext/react";
import { getAboutData } from "@/sanity/queries";
import Link from "next/link";
import NoData from "@/components/no-data";
import { MotionDiv, MotionP, MotionSection } from "@/components/motion-utils";
import SectionHeader from "@/components/section-header";

export default async function About() {
	const data = await getAboutData();
	if (!data) {
		return <NoData />;
	}

	return (
		<main className="max-w-6xl mx-auto">
			<MotionSection
				className="container mx-auto px-4 mb-10"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: 0.1,
							delayChildren: 0.2,
						},
					},
				}}
			>
				<SectionHeader>{data.resumeTitle}</SectionHeader>

				<MotionP
					className="text-center pt-4 pb-2 text-[#9e876f]"
					variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
					transition={{ duration: 0.5 }}
				>
					{data.resumeDescription}
				</MotionP>

				<MotionDiv
					className="flex justify-center"
					variants={{
						hidden: { opacity: 0, scale: 0.95 },
						visible: { opacity: 1, scale: 1 },
					}}
					transition={{ duration: 0.4, delay: 0.2 }}
				>
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
				</MotionDiv>
			</MotionSection>

			<MotionSection
				className="container mx-auto px-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				<SectionHeader>{data.aboutTitle}</SectionHeader>
				<MotionDiv
					className="px-4 sm:px-6 md:px-10 pt-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					{data.aboutDescription && (
						<PortableText
							value={data.aboutDescription}
							components={components}
						/>
					)}
				</MotionDiv>
			</MotionSection>
		</main>
	);
}
