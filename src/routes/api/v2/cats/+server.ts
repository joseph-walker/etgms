import { error } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit"

type V2Cat = {
    breed: string;
    coat: string;
    num_legs: number;
    has_tail: boolean;
    media_href: string;
}

const catList: Record<number, V2Cat> = {
    0: {
        breed: "siamese",
        coat: "short",
        num_legs: 4,
        has_tail: true,
        media_href: "siamese.jpeg"
    },
    1: {
        breed: "manx",
        coat: "medium",
        num_legs: 4,
        has_tail: false,
        media_href: "manx.jpeg"
    },
    2: {
        breed: "norwegian forest",
        coat: "long",
        num_legs: 4,
        has_tail: true,
        media_href: "norwegian.webp"
    }
}

export const GET: RequestHandler = async function({ request }) {
    if (Math.random() <= 0.35) {
        throw error(500, "Service unavailable");
    }

    const host = request.headers.get("host");

    const body = JSON.stringify(
        Object.fromEntries(
            Object.entries(catList).map(function ([id, cat]) {
                return [id, { ...cat, media_href: `https://${host}/${cat.media_href}`}]
            })
        )
    );

    const res = new Response(body);
    res.headers.set("Content-Type", "application/json");

    return res;
}
