import { failure, success } from "../../typing/compiler";
import { exclude } from "../stringParser/exclude";
import { interleave } from "../stringParser/interleave";
import { sequence } from "../stringParser/sequence";
import { parseString } from "../stringParser/string";
import { Identifier } from "./logic";
import { Spaced, Whitespace } from "./whitespace";

export function MultiDivert<T>(): Parser<T[]>{

    // Try single thread first
    // var threadDivert = Parse(StartThread);
    // if (threadDivert) {
    //     diverts = new List<Object> ();
    //     diverts.Add (threadDivert);
    //     return diverts;
    // }

    const arrowsAndDivertsParser = interleave(
        ParseDivertArrowOrTunnelOnwards(),
        DivertIdentifierWithArguments());

    return ctx => {
        let innerContext = ctx;
        innerContext = Whitespace()(ctx).ctx;

        const arrowsAndDivertsResult = arrowsAndDivertsParser(innerContext);
        if (!arrowsAndDivertsResult.success || !arrowsAndDivertsResult.hasValue)
                return arrowsAndDivertsResult;

        const arrowsAndDiverts = arrowsAndDivertsResult.value;
        for (let i = 0; i < arrowsAndDiverts.length; ++i) {
            const isArrow = (i % 2) == 0;
        }

        return success(innerContext, [] as T[])
    }
}


export function ParseDivertArrowOrTunnelOnwards(): Parser<string>{
    return ctx => {
        let numArrows = 0;
        let innerContext = ctx;

        
        for (let result ; result = parseString ("->")(innerContext);){
            if(result.success){
                numArrows++;
                innerContext = {...result.ctx}
            }else{
                break;
            }
        }

        if (numArrows == 0)
            return failure(innerContext, "->");

        else if (numArrows == 1)
            return success(innerContext, "->");

        else if (numArrows == 2)
            return success(innerContext, "->->");

        else {
            console.error("Unexpected number of arrows in divert. Should only have '->' or '->->'");
            return success(innerContext, "->->");
        }
    }

}

function DivertIdentifierWithArguments(){
    return Spaced(DotSeparatedDivertPathComponents());
}

function DotSeparatedDivertPathComponents() {
    return interleave(
            Spaced (Identifier()), 
            exclude (parseString ("."))
        );
}