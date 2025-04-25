"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MotionDiv, MotionSection } from "@/components/motion-utils";

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
				headers: { Accept: "application/json" },
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
			<MotionSection
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: 0.12,
							delayChildren: 0.2,
						},
					},
				}}
			>
				<MotionDiv
					className="italic flex flex-col justify-center max-w-2xl mx-auto pt-4 space-y-4"
					variants={{
						hidden: { opacity: 0, scale: 0.95 },
						visible: { opacity: 1, scale: 1 },
					}}
					transition={{ duration: 0.4, ease: "easeOut" }}
				>
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="hidden"
							name="subject"
							value="Contact Form Submission"
						/>
						<input
							type="hidden"
							name="from_name"
							value="Portfolio Notifications"
						/>

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
							<MotionDiv
								className="flex justify-center items-center gap-2"
								initial={{ opacity: 0, y: -5 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.3 }}
							>
								<Link
									href={`mailto:${email}?subject=Contact&body=Hello!`}
									className="flex items-center gap-2 justify-center hover:text-[#9e876f]"
									title={`Press to email ${email}`}
								>
									<Mail className="w-4 h-4" aria-hidden="true" />
									{email}
								</Link>
							</MotionDiv>
						)}

						<MotionDiv className="grid grid-cols-2 gap-6">
							<div className="space-y-1">
								<Label htmlFor="first_name">First Name</Label>
								<Input type="text" id="first_name" name="First Name" required />
							</div>
							<div className="space-y-1">
								<Label htmlFor="last_name">Last Name</Label>
								<Input type="text" id="last_name" name="Last Name" required />
							</div>
						</MotionDiv>

						<MotionDiv className="space-y-1">
							<Label htmlFor="email">Email</Label>
							<Input type="email" id="email" name="Email" required />
						</MotionDiv>

						<MotionDiv className="space-y-1">
							<Label htmlFor="message">Message</Label>
							<Textarea id="message" name="Message" required />
						</MotionDiv>

						<MotionDiv
							className="flex justify-end"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.3 }}
						>
							<Button
								size="lg"
								variant="download"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Sending..." : "Send"}
							</Button>
						</MotionDiv>
					</form>
				</MotionDiv>
			</MotionSection>
		</>
	);
}
