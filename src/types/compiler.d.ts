type Parser<T> = (ctx: Context) => Result<T>;

type Context = Readonly<{
    text: string; // the full input string
    index: number; // our current position in it
  }>;

type Result<T> = Success<T> | Empty | Failure;

type Success<T> = Readonly<{
    success: true;
    hasValue: true;
    value: T;
    ctx: Context;
  }>;

type Empty = Readonly<{
  success: true;
  hasValue: false;
  ctx: Context;
}>
type Failure = Readonly<{
    success: false;
    expected: string;
    ctx: Context;
  }>;
