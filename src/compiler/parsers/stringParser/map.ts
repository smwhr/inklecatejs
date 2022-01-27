import { success } from "../../typing/compiler";

// a convenience method that will map a Success to callback, to let us do common things like build AST nodes from input strings.
export function map<A, B>(parser: Parser<A>, fn: (val: A) => B): Parser<B> {
    return ctx => {
      const res = parser(ctx);
      return res.success ? success(res.ctx, fn(res.value)) : res;
    };
  }