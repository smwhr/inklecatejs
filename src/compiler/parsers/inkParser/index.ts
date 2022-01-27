import { ContentTextNoEscape } from "./content";
import { parseStatementAtLevel } from "./statements";

export function InkParser(ctx: Context){

    const topLevelParser = parseStatementAtLevel("Top");

    const _parsed = topLevelParser(ctx);

    return _parsed

}