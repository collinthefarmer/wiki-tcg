import { Server } from "bun";
import { fetchBoosterPack, fetchCard, GameCard } from "./game.ts";

function buildCardHTML(card: GameCard, i: number = 0) {
    return `
        <div class="card rarity-${(Math.random() * 5).toFixed(0)}" id="${card.title}" style="--i: ${i}">
            <div class="card-heading">
                <h3 style="--len: ${card.display_title.length};">${card.display_title}</h3>
                <p>${card.classification}</p>
            </div>
            <div class="card-image" style="background-image: url(${card.image_source})"></div>
            <p class="card-flavor">${card.flavorText}</p>
            <a href="https://en.wikipedia.org/wiki/${card.title}" class="card-desc">${card.description}</a>
        </div>
    `;
}

Bun.serve({
    async fetch(request: Request, server: Server) {
        const url = new URL(request.url);
        if (url.pathname === "/") return new Response(Bun.file("index.html"));
        if (url.pathname === "/booster") {
            const cards = await fetchBoosterPack();
            const html = (cards.filter(c => c) as GameCard[])
                .map((c, i) => buildCardHTML(c, i))
                .reduce((acc, cur) => `${acc}${cur}`, "");

            return new Response(html);
        }
        if (url.pathname === "/collect") {
            const title = url.searchParams.get("title");
            if (!title) return new Response(null, { status: 400 });

            const card = await fetchCard(title);
            return new Response(buildCardHTML(card));
        }

        return new Response(null, { status: 404 });
    }
});