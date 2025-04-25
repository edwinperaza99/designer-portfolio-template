import ContactForm from "@/components/contact-form";
import NoData from "@/components/no-data";
import SectionHeader from "@/components/section-header";
import { getContactData } from "@/sanity/queries";

export default async function Contact() {
	const data = await getContactData();
	if (!data) {
		return <NoData />;
	}

	return (
		<main className="container mx-auto px-4 mb-10 max-w-6xl">
			<SectionHeader>{data.title}</SectionHeader>
			<ContactForm accessToken={data.accessToken} email={data.email} />
		</main>
	);
}
