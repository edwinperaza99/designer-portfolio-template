"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
	return (
		<Link
			href="/"
			className="inline-flex items-center text-[#9e876f] hover:text-[#bda88d] transition-colors group"
		>
			<ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
			Back to Projects
		</Link>
	);
}
