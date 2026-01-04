import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { body, isValidSignature } = await parseBody<{
			_type: string;
			slug?: string;
		}>(req, process.env.SANITY_HOOK_SECRET);

		if (!isValidSignature) {
			return new Response("Invalid Signature", { status: 401 });
		}

		if (!body?._type) {
			return new Response("Bad Request", { status: 400 });
		}

		await revalidateTag("global-sanity", { expire: 0 });

		console.log("Revalidated everything via global-sanity tag");

		return NextResponse.json({
			status: 200,
			revalidated: true,
			now: Date.now(),
			body,
		});
	} catch (error: unknown) {
		console.error(error);
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return new Response(errorMessage, { status: 500 });
	}
}
