import { empty, success } from "../../typing/compiler";

// match a parser, or succeed with empty
export function optional<T>(parser: Parser<T>): Parser<T> {
    return ctx => {
      const result = parser(ctx);
      return result.success && result.hasValue
              ? success(result.ctx, result.value)
              : empty(result.ctx)
    }
  }