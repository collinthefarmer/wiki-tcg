import { buildCardFromSeed } from "./cardBuilder";
import { randomArticleSeed } from "./article";
import { classCard } from "./cardClasser";
import { buildTemplate } from "./cardTemplateBuilder";

// TODO: start here > search for TODOs!

const seed = await randomArticleSeed();
console.log(`Generated seed for ${seed.id}`);

// will need a check here to see if title+revision has already been made into card

const card = await buildCardFromSeed(seed, {
    classification: {
        adjectives: ["BIG", "SMALL"],
        nouns: ["CAT", "DOG"]
    },
    flavor: {}
});
console.log(`Generated card for ${seed.id}`);

// card gets stored in DB after this step
// meaning random card selection can occur as both previous steps (generating card from potentially new article) OR loading random card from DB instead

const cardClass = classCard(card, {});
console.log(`Generated class for ${seed.id}`);

const cardTemplate = buildTemplate(card, cardClass);
console.log(`Generated template for ${seed.id}`);

console.log(cardTemplate);

