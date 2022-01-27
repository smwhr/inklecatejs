export function context(text: string): Context {
    return {text: text, index: 0}
}

export function success<T>(ctx: Context, value: T): Success<T> {
    return { success: true, hasValue: true, value, ctx };
}
export function empty(ctx: Context): Empty{
    return { success: true, hasValue: false, ctx };
}
export function failure(ctx: Context, expected: string): Failure {
    return { success: false, expected, ctx };
}

export function isSuccess<T>(result: Result<T>): result is Success<T> {
    return result.success === true;
}

export function isFailure<T>(result: Result<T>): result is Failure {
    return result.success === false;
}