import { empty, failure, success } from "../../typing/compiler";
import { OneOf } from "../stringParser/any";
import { excludeOptional } from "../stringParser/exclude";
import { OneOrMore } from "../stringParser/many";
import { parseNewline } from "../stringParser/newline";
import { optional } from "../stringParser/optional";
import { regex } from "../stringParser/regex";
import { sequence } from "../stringParser/sequence";

export function Whitespace(){
    return regex(new RegExp(/([^\S\r\n])+/, 'g'), "whitespace")
}

export function AnyWhitespace(){
    return regex(new RegExp(/\s+/, 'g'), "whitespace")
}

export function MultilineWhitespace(): Parser<null>{
    return ctx => {
        const result = OneOrMore(NewLine())(ctx);
        if(result.success) empty(result.ctx)
        return failure(ctx, "multi whitespace");
    }
}

export function Spaced<T>(parser: Parser<T>): Parser<T>{
    return ctx => {
        const spacedSequence = sequence<T|string>([
                excludeOptional(Whitespace()), 
                parser, 
                excludeOptional(Whitespace()) 
            ])
        const res = spacedSequence(ctx) as Result<[T]>;

        if(res.success && res.hasValue){
            const [actualValue] = res.value;
            return success(res.ctx, actualValue)
        }else{
            return res;
        }
        
    }
}

export function MultiSpaced<T>(parser: Parser<T>): Parser<T>{
    return ctx => {
        const spacedSequence = sequence<T|string>([
            excludeOptional(AnyWhitespace()), 
            parser, 
            excludeOptional(AnyWhitespace())
        ])
        const res = spacedSequence(ctx) as Result<[T]>;

        debugger;

        if(res.success && res.hasValue){
            const [actualValue] = res.value;
            return success(res.ctx, actualValue)
        }else{
            return res;
        }
    }
}

export function EndOfFile(): Parser<unknown>{
    return sequence([
        optional(Whitespace()), 
        ctx =>{
        if(ctx.index == ctx.text.length){
            return empty(ctx);
        }else{
            return failure(ctx, "end of file");
        }
    }])
}

export function NewLine(): Parser<unknown>{
    return sequence([optional(Whitespace()), parseNewline()]);
}

export function EndOfLine(): Parser<unknown>{
    return OneOf([NewLine(), EndOfFile()]);
}