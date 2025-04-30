import type { Metadata } from "next";
import { getHeaderData, getSettings } from "@/sanity/queries";
import "@/app/globals.css";
import { redirect } from "next/navigation";
import NavBar from "@/components/nav-bar";
import localFont from "next/font/local";
import { MotionFooter, MotionH1, MotionH2 } from "@/components/motion-utils";

export const revalidate = false;

const MinionPro = localFont({
	src: "../fonts/MinionPro.woff",
	variable: "--font-minion-pro",
	weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
	const settings = await getSettings();

	if (!settings) {
		console.warn(
			"Warning: No settings document found. Returning fallback metadata."
		);
		return {
			title: "Update Title In Sanity",
			description: "",
		};
	}

	const title = settings.siteTitle ?? "My Site";
	const description = settings.siteDescription ?? "";
	const applicationName = settings.applicationName;
	const authors = settings.authors ?? [];
	const creator = settings.creator;
	const publisher = settings.publisher;
	const keywords = settings.defaultKeywords ?? [];

	let openGraph;
	if (settings.openGraphImages?.length) {
		openGraph = {
			title,
			description,
			url: settings.openGraphUrl ?? undefined,
			type: "website" as const,
			locale: settings.openGraphLocale,
			siteName: settings.openGraphSiteName,
			images: settings.openGraphImages.map((img) => ({
				url: img.asset.url,
				width: 1200,
				height: 630,
				alt: img.alt,
			})),
		};
	}

	let twitter;
	if (settings.twitterImages?.length) {
		twitter = {
			card:
				(settings.twitterCard as
					| "summary_large_image"
					| "summary"
					| "player"
					| "app") ?? "summary_large_image",
			title,
			description,
			images: settings.twitterImages.map(
				(img: { asset: { url: string }; alt?: string }) => ({
					url: img.asset.url,
					alt: img.alt || "Default alt text",
				})
			),
		};
	}

	return {
		title: { default: title, template: `%s | ${title}` },
		description,
		...(applicationName && { applicationName }),
		...(authors.length > 0 && { authors }),
		...(creator && { creator }),
		...(publisher && { publisher }),
		keywords,
		...(openGraph && { openGraph }),
		...(twitter && { twitter }),
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const data = await getHeaderData();
	if (!data) {
		console.warn("Warning: No header data found.");
		redirect("/studio");
	}

	return (
		<html lang="en">
			<body
				className={`${MinionPro.className} antialiased flex flex-col bg-white text-black min-h-screen`}
			>
				<header className="flex flex-col justify-content">
					<section className="container text-center mx-auto">
						<MotionH1
							className="text-7xl font-black uppercase pt-10"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
						>
							{data.title}
						</MotionH1>

						<MotionH2
							className="text-2xl text-[#9e876f] font-light uppercase"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
						>
							{data.subtitle}
						</MotionH2>
					</section>
				</header>
				<NavBar />
				<div className="flex-1">{children}</div>

				<MotionFooter
					className="container mx-auto text-center py-6 font-thin text-gray-800"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
				>
					<p>
						&copy; {new Date().getFullYear()} {data.title}
					</p>
				</MotionFooter>
			</body>
		</html>
	);
}
