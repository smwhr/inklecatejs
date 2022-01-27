import { regex } from "./regex"
import { parseChars, parseUntil } from "./string";

export function parseNewline(){
    return regex(new RegExp(/([\r]?)([\n])/, 'g'), "new line")
}

export function LineRemainder(){
    return parseUntil(parseChars(["\n","\r"]));
}
