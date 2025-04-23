import type { PortableTextReactComponents } from "@portabletext/react";

const components: Partial<PortableTextReactComponents> = {
	marks: {
		link: ({
			value,
			children,
		}: {
			value?: { href: string };
			children: React.ReactNode;
		}) => (
			<a
				href={value?.href}
				target="_blank"
				rel="noopener noreferrer"
				className="underline decoration-[#9e876f] hover:text-[#bda88d] transition-colors"
			>
				{children}
			</a>
		),
	},

	block: {
		normal: ({ children }: { children?: React.ReactNode }) => (
			<p className="mb-1 leading-relaxed text-[#9e876f] italic">{children}</p>
		),

		quote: ({ children }: { children?: React.ReactNode }) => (
			<blockquote className="my-10 text-center text-lg italic text-[#9e876f]">
				<span className="mx-auto mb-4 block h-1 w-24 rounded-full bg-[#9e876f]" />
				“{children}”
			</blockquote>
		),
	},
};

export default components;
