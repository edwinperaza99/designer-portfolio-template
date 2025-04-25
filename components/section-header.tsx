import { MotionDiv, MotionH2 } from "@/components/motion-utils";

type Props = {
	children: React.ReactNode;
};

export default function SectionHeader({ children }: Props) {
	return (
		<MotionDiv
			className="flex justify-center items-center"
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: 0.1,
					},
				},
			}}
		>
			<MotionDiv
				className="bg-[#9e876f] h-1 w-full origin-right"
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			/>
			<MotionH2
				className="text-4xl px-2 text-black uppercase whitespace-nowrap"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{children}
			</MotionH2>
			<MotionDiv
				className="bg-[#9e876f] h-1 w-full origin-left"
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
			/>
		</MotionDiv>
	);
}
