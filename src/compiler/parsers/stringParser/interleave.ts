// Similarly, but even more powerfully, the Interleave method patterns 
// of the form ABABA etc. Frequently, this is used to interleave some 
// core content with whitespace. Here's an example that parses the 
// arguments to a flow (e.g. knot, stitch or function), that is a series
// of identifiers separated by commas:

import { failure, success } from "../../typing/compiler";
import { EndOfFile } from "../inkParser/whitespace";

const addToList = <T>(result: Success<T|T[]>, list: T[]): T[] => {
    if(Array.isArray(result.value)){
        return [...list, ...result.value]
    }else{
        return [...list, result.value]
    }

}

 export function interleave<T,U>(parserA: Parser<T>, parserB: Parser<U>, untilTerminator: Parser<T>|null = null): Parser<Array<T|U>> {
    return ctx => {

        let list: Array<T|U> = [];

        let innerContext = ctx;

        const firstA = parserA(innerContext);
        if(!firstA.success) return firstA;
        firstA.hasValue && (list = addToList(firstA, list));
        innerContext = {... firstA.ctx};

        let isEndOfFile = false;

        do{

            if(untilTerminator !== null && untilTerminator(innerContext).success){
                break;
            }
            const innerB = parserB(innerContext);
            if(!innerB.success) break;
            innerB.hasValue && (list = addToList(innerB, list));
            innerContext = {... innerB.ctx};

            const outerA = parserA(innerContext);
            if(!outerA.success) break;
            outerA.hasValue && (list = addToList(outerA, list));
            innerContext = {... outerA.ctx};

            isEndOfFile = EndOfFile()(innerContext).success

        }while(!isEndOfFile);

        if(list.length == 0) failure(ctx, `interleaved contents ${parserA.name} | ${parserB.name} | ${untilTerminator?.name}`)

        return success(ctx, list);
    };
  }
  