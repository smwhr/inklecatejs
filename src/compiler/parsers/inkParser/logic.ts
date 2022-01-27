import { failure, success } from "../../typing/compiler";
import { Identifier  as parsedIdentifier } from "../parsedHierarchy/Identifier";
import { regex } from "../stringParser/regex";
import { ExtendIdentifierCharacterRegex } from "./char_ranges";


export function Identifier(): Parser<parsedIdentifier>{
    return ctx => {
        const result = regex(ExtendIdentifierCharacterRegex, "identifier")(ctx);
        if(!result.success) return result;

        const numericalOnly = /^[0-9]*$/.exec(result.value) !== null;
        if(numericalOnly) return failure(ctx, "non-numerical identifier");

        return success(result.ctx, new parsedIdentifier(result.value))
        
    }
    
}