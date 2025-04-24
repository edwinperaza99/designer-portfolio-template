import ContactForm from "@/components/contact-form";
import { getContactData } from "@/sanity/queries";

export default async function Contact() {
	const data = await getContactData();

	return (
		<main className="container mx-auto px-4 mb-10 max-w-6xl">
			<section className="flex justify-center items-center">
				<div className="bg-[#9e876f] h-1 w-full"></div>
				<h2 className="text-4xl px-2 text-black uppercase whitespace-nowrap">
					{data.title}
				</h2>
				<div className="bg-[#9e876f] h-1 w-full"></div>
			</section>
			<ContactForm accessToken={data.accessToken} email={data.email} />
		</main>
	);
}
