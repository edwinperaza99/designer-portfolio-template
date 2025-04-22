import Link from "next/link";

export default function NavBar() {
	return (
		<nav className="flex justify-center py-8">
			<ul className="flex flex-row gap-2 sm:gap-4 py-3 px-2 sm:px-16 max-w-[90%] md:max-w-[70%]  border-t-2 border-b-2 border-[#9e876f]">
				<li>
					<Link href="/" className="hover:text-[#9e876f]">
						Home
					</Link>
				</li>
				<li>
					<Link href="/about" className="hover:text-[#9e876f]">
						About
					</Link>
				</li>
				<li>
					<Link href="/contact" className="hover:text-[#9e876f]">
						Contact
					</Link>
				</li>
			</ul>
		</nav>
	);
}
