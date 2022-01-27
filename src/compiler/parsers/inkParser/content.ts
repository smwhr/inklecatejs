import { OneOf } from "../stringParser/any";
import { parseUntil } from "../stringParser/string";
import { EndOfLine } from "./whitespace";

const _nonTextPauseCharacters = ["-","<"];
const _nonTextEndCharacters = ["{", "}", "|", "\n", "\r", "\\", "#"];
const _notTextEndCharactersChoice = [..._nonTextEndCharacters, "[","]"];
const _notTextEndCharactersString = [..._nonTextEndCharacters, "\""];

export function ContentTextNoEscape(){
    //const nonTextRule = OneOf (ParseDivertArrow, ParseThreadArrow, EndOfLine, Glue);
    const nonTextRule = OneOf ([EndOfLine()] );

    return parseUntil(nonTextRule);
}