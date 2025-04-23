import Link from "next/link";
import { Button } from "@/components/ui/button";

type NoDataProps = {
	label?: string;
	description?: string;
};

export default function NoData({
	label = "Nothing to show",
	description = "This section is currently empty. You can add content in the Studio.",
}: NoDataProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
			<h2 className="text-xl font-semibold text-gray-700">{label}</h2>
			<p className="text-sm text-muted-foreground max-w-md">{description}</p>
			<Link href="/studio">
				<Button>Go to Studio</Button>
			</Link>
		</div>
	);
}
