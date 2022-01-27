import { success } from "../../typing/compiler";

export function sequence<T>(parsers: Parser<T>[]): Parser<T[]> {
    return ctx => {
        let values: T[] = [];
        let nextCtx = ctx;
        for (const parser of parsers) {
          const res = parser(nextCtx);
          if (!res.success) return res;
          res.hasValue && values.push(res.value);
          nextCtx = res.ctx;
        }
        return success(nextCtx, values);
      };
}