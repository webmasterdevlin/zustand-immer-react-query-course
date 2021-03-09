import { antiHeroHandler } from "./antiHeroHandler";
import { heroHandler } from "./heroHandler";
import { villainHandler } from "./villainHandler";

/* This handle is not singleton. States get destroy per request. */

export const handlers = [...antiHeroHandler, ...heroHandler, ...villainHandler];
