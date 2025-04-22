"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ContactForm({
	accessToken,
	email,
}: {
	accessToken: string;
	email?: string;
}) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		// Append required fields directly to FormData
		formData.append("access_key", accessToken);

		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					Accept: "application/json",
				},
				body: formData,
			});

			const result = await response.json();

			if (result.success) {
				toast.success("Message sent successfully!");
				form.reset(); // Clear the form
			} else {
				toast.error("Failed to send message. Please try again.");
			}
		} catch (error) {
			toast.error("An error occurred. Please try again.");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<>
			<Toaster position="bottom-center" />

			<form
				onSubmit={handleSubmit}
				className="space-y-2 italic flex flex-col justify-center max-w-[700px] mx-auto pt-4"
			>
				<input type="hidden" name="subject" value="Contact Form Submission" />
				<input type="hidden" name="from_name" value="Portfolio Notifications" />

				<label htmlFor="botcheck" className="sr-only">
					Do not check this box
				</label>
				<input
					type="checkbox"
					name="botcheck"
					id="botcheck"
					className="hidden"
				/>
				{email && (
					<div className="flex justify-center items-center gap-2">
						<Link
							href={`mailto:${email}&body=Hello!`}
							className="flex items-center gap-2 justify-center"
							title={`Press to email ${email} directly from your email client`}
						>
							<Mail className="w-4 h-4" aria-hidden="true" />
							{email}
						</Link>
					</div>
				)}

				<div className="grid grid-cols-2 gap-6">
					<div className="space-y-1">
						<Label htmlFor="first_name">First Name</Label>
						<Input type="text" id="first_name" name="First Name" required />
					</div>
					<div className="space-y-1">
						<Label htmlFor="last_name">Last Name</Label>
						<Input type="text" id="last_name" name="Last Name" required />
					</div>
				</div>

				<div className="space-y-1">
					<Label htmlFor="email">Email</Label>
					<Input type="email" id="email" name="Email" required />
				</div>

				<div className="space-y-1">
					<Label htmlFor="message">Message</Label>
					<Textarea id="message" name="Message" required />
				</div>

				<div className="flex justify-end">
					<Button
						size="lg"
						variant="download"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Sending..." : "Send"}
					</Button>
				</div>
			</form>
		</>
	);
}
