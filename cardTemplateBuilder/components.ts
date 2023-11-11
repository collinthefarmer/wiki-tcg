import { type CardTemplateClass } from "../cardClasser";
import { type Card } from "../cardBuilder";


type ComponentBuildOutput = {
    html: string,
    id: string
}

export function buildCardHeader<T>(card: Card<T>, cardClass: CardTemplateClass<T>): ComponentBuildOutput {
    return { id: "todo", html: "todo" }; // TODO
}

export function buildCardBody<T>(card: Card<T>, cardClass: CardTemplateClass<T>): ComponentBuildOutput {
    return { id: "todo", html: "todo" }; // TODO
}

export function buildCardFooter<T>(card: Card<T>, cardClass: CardTemplateClass<T>): ComponentBuildOutput {
    return { id: "todo", html: "todo" }; // TODO
}