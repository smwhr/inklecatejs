export function any<T>(parsers: Parser<T>[]): Parser<T> {
    return ctx => {
      let furthestRes: Result<T> | null = null;
      let expecteds:string = '';
      for (const parser of parsers) {
        const res = parser(ctx);
        if (res.success) return res;
        if (!furthestRes || furthestRes.ctx.index < res.ctx.index){
            furthestRes = res;
        }
        expecteds += ((expecteds.length > 0 ? " or " : "") +res.expected)
      }
      return {... furthestRes!, expected: expecteds};
    };
  }

export const OneOf = any;
  