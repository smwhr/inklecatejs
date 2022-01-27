import { failure } from "../../typing/compiler";
import { LineRemainder } from "./newline";

export function expect<T>(parser: Parser<T>, message: string|null = null, recovery: Parser<T>|null = null): Parser<T>{
 return ctx => {
    const result = parser(ctx);
    if(result.success) return result;

    let butSaw = "";
    const lineRemainder = LineRemainder()(ctx)
    if (!lineRemainder.success || !lineRemainder.hasValue ||lineRemainder.value.length == 0) {
        butSaw = "end of line";
    }else{
        butSaw = "'" + lineRemainder.value + "'";
    }
    
    if(recovery){
        return recovery(ctx)
    }
    
    const errorMessage = `Expected ${message || parser.name} but saw ${butSaw}`;
    return failure(ctx, errorMessage);
 }
}



export const Expect = expect;