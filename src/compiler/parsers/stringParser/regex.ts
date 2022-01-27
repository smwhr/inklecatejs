import { failure, success } from "../../typing/compiler";

export function parseRegex(regex1: RegExp, expected: string): Parser<string> {
    return ctx => {
      regex1.lastIndex = ctx.index;
      const res = regex1.exec(ctx.text);
      if (res && res.index === ctx.index) {
        return success({ ...ctx, index: ctx.index + res[0].length }, res[0]);
      } else {
        return failure(ctx, expected);
      }
    };
  }

export const regex = parseRegex;