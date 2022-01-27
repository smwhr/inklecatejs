import { failure, success } from "../../typing/compiler";

// look for 0 or more of something, until we can't parse any more. note that this function never fails, it will instead succeed with an empty array.
export function many<T>(parser: Parser<T>): Parser<T[]> {
    return ctx => {
      let values: T[] = [];
      let nextCtx = ctx;
      while (true) {
        const res = parser(nextCtx);
        if (!res.success) break;
        res.hasValue && values.push(res.value);
        nextCtx = res.ctx;
      }
      return success(nextCtx, values);
    };
  }

export function some<T>(parser: Parser<T>): Parser<T[]> {
    return ctx => {
      let values: T[] = [];
      let nextCtx = ctx;
      while (true) {
        const res = parser(nextCtx);
        if (!res.success) break;
        res.hasValue && values.push(res.value);
        nextCtx = res.ctx;
      }
      if(values.length == 0){
        return failure(ctx, "at least 1 element")
      }else{
        return success(nextCtx, values);
      }
    };
}

export const OneOrMore = some;