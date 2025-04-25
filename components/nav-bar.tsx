import { MotionLi, MotionNav, MotionUl } from "@/components/motion-utils";
import Link from "next/link";

export default function NavBar() {
	return (
		<MotionNav
			className="flex justify-center py-8 relative"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<MotionUl
				className="flex flex-row gap-2 sm:gap-4 py-3 px-2 sm:px-16 max-w-[90%] md:max-w-[70%] relative border-t-2 border-b-2 border-[#9e876f] overflow-hidden"
				initial={{ clipPath: "inset(0% 50% 0% 50%)" }}
				animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
				transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
			>
				<MotionLi
					whileHover={{ scale: 1.05, opacity: 1 }}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.4 }}
				>
					<Link
						href="/"
						className="transition-colors duration-200 hover:text-[#9e876f]"
					>
						Home
					</Link>
				</MotionLi>
				<MotionLi
					whileHover={{ scale: 1.05, opacity: 1 }}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.5 }}
				>
					<Link
						href="/about"
						className="transition-colors duration-200 hover:text-[#9e876f]"
					>
						About
					</Link>
				</MotionLi>
				<MotionLi
					whileHover={{ scale: 1.05, opacity: 1 }}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.6 }}
				>
					<Link
						href="/contact"
						className="transition-colors duration-200 hover:text-[#9e876f]"
					>
						Contact
					</Link>
				</MotionLi>
			</MotionUl>
		</MotionNav>
	);
}
