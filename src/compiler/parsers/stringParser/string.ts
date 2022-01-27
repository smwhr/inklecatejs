import { failure, success } from "../../typing/compiler";
import { OneOf } from "./any";
import { some } from "./many";

export function parseString(match: string): Parser<string> {
    return ctx => {
      const endIdx = ctx.index + match.length;
      if (ctx.text.substring(ctx.index, endIdx) === match) {
        return success({ ...ctx, index: endIdx }, match);
      } else {
        return failure(ctx, match);
      }
    };
  }

export const str = parseString;

export function parseChars(charmatchs: string[]): Parser<string> {
  return OneOf(charmatchs.map(char => str(char)));
}

export function parseUntil<T>(stopParser: Parser<T>): Parser<string>{

    return ctx => {
      const startOf = ctx.index;
      let i;
      for(i = 0; i + startOf < ctx.text.length ; i++){
        const isStop = stopParser({...ctx, index: startOf + i});
        if(isStop.success){
          break;
        }
      }
      return success({...ctx, index: startOf+i}, ctx.text.substring(startOf, startOf+i));
    }

  }

