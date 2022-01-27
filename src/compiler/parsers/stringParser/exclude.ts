import { empty } from "../../typing/compiler";


// Return success instead of the real result so that it gets excluded
// from result arrays (e.g. Interleave)
export function exclude<T>(parser: Parser<T>): Parser<T> {
    return ctx => {
      const result = parser(ctx);
      return result.success 
              ? empty(result.ctx)
              : result;
    }
  }

export function excludeOptional<T>(parser: Parser<T>): Parser<T> {
    return ctx => {
        const result = parser(ctx);
        return empty(result.ctx);
    }
}
  