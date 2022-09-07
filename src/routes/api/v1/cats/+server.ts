import type { RequestHandler } from "@sveltejs/kit"

type V1Cat = {
    variety: string;
    hairLength: string;
    tail: boolean;
}

const catList: Record<number, V1Cat> = {
    0: {
        variety: "siamese",
        hairLength: "S",
        tail: true
    },
    1: {
        variety: "manx",
        hairLength: "M",
        tail: false
    },
    2: {
        variety: "norwegian forest",
        hairLength: "L",
        tail: true
    }
}

export const GET: RequestHandler = async function({ request }) {
    const res = new Response(JSON.stringify(catList));
    res.headers.set("content-type", "application/json");

    return res;
}
