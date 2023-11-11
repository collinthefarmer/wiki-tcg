// takes in card and cardClass, returns html
import { type CardTemplateClass } from "../cardClasser";
import { type Card } from "../cardBuilder";

import { buildCardBody, buildCardFooter, buildCardHeader } from "./components.ts";
import { htmlIdEscape } from "./util.ts";


export type CardTemplate = {
    title: string,
    revision: number,
    template: string,
    componentIds: string[]
}

export function buildTemplate<T>(card: Card, cardClass: CardTemplateClass<T>): CardTemplate {
    const { html: hHtml, id: hId } = buildCardHeader(card, cardClass);
    const { html: bHtml, id: bId } = buildCardBody(card, cardClass);
    const { html: fHtml, id: fId } = buildCardFooter(card, cardClass);
    return {
        title: card.titleNormalized,
        revision: card.revision,
        template: `
            <article class="card" id="${htmlIdEscape(card.id)}">
                <header>
                    ${hHtml}
                </header>
                <div class="card-body">
                    ${bHtml}
                </div>
                <footer>
                    ${fHtml}
                </footer>
            </article>        
        `,
        componentIds: [hId, bId, fId]
    };
}