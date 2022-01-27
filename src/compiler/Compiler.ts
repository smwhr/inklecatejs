import { InkParser } from "./parsers/inkParser";
import { context } from "./typing/compiler";

export class Compiler {
    public static inkVersionCurrent = 20;

    private _inputString!: string;

    constructor(inkSource: string) {
        this._inputString = inkSource;
    }

    public Parse(): any{

        const ctx = context(this._inputString);
        const _parsed = InkParser(ctx)
        
        if(_parsed.success) return _parsed;

        console.warn(_parsed, 
                    `expected ${_parsed.expected} at char ${ctx.index}`,
                    ctx.text.substring(Math.max(0, ctx.index - 10), Math.min(ctx.text.length, ctx.index + 10))
                    )
        return false;

    }

    public Compile(): string{
        // Parse then ConvertToRuntime
        const _parsed = this.Parse();
        if(!_parsed) return JSON.stringify({"error": "parse error"})

        return JSON.stringify({"inkVersion":20, "root":[], "listDefs":{} })
    }

}