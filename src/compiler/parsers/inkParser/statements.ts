import { empty, success } from "../../typing/compiler";
import { OneOf } from "../stringParser/any";
import { excludeOptional } from "../stringParser/exclude";
import { Expect } from "../stringParser/expect";
import { interleave } from "../stringParser/interleave";
import { parseNewline } from "../stringParser/newline";
import { optional } from "../stringParser/optional";
import { sequence } from "../stringParser/sequence";
import { parseChars, parseUntil } from "../stringParser/string";
import { ContentTextNoEscape } from "./content";
import { MultiDivert } from "./divert";
import { EndOfLine, MultilineWhitespace, Spaced } from "./whitespace";

export const StatementLevel = {
    "InnerBlock": 1,
    "Stitch": 2,
    "Knot": 4,
    "Top": 8
}

export function parseStatementAtLevel(level: keyof typeof StatementLevel): Parser<Array<string|null>>{

    const {rulesAtLevel, breakingRules} = StatementAtLevel (level);

    return interleave(
        excludeOptional(MultilineWhitespace()), 
        OneOf(rulesAtLevel),
        //breakingRules.length > 0 ? breakingRules[0] : null
    );
}

function StatementAtLevel(levelKey: keyof typeof StatementLevel): {
    rulesAtLevel: Parser<string>[];
    breakingRules: Parser<string>[];
}{

    const level = StatementLevel[levelKey];
    const rulesAtLevel: Parser<any>[] = [];
    const breakingRules: Parser<any>[] = [];

    // Diverts can go anywhere
    rulesAtLevel.push(Line(MultiDivert()));
    rulesAtLevel.push(Line(Spaced(ContentTextNoEscape())));

    return {rulesAtLevel, breakingRules};

    // Knots can only be parsed at Top/Global scope
    if (level >= StatementLevel.Top)
        rulesAtLevel.push(KnotDefinition());

    // rulesAtLevel.push(Line(Choice()));
    // rulesAtLevel.push(Line(AuthorWarning()));

    // Gather lines would be confused with multi-line block separators, like
    // within a multi-line if statement
    if (level > StatementLevel.InnerBlock)
        rulesAtLevel.push(Gather());
    
    // Stitches (and gathers) can (currently) only go in Knots and top level
    if (level >= StatementLevel.Knot)
        rulesAtLevel.push(StitchDefinition());
    
    // Global variable declarations can go anywhere
    // rulesAtLevel.push(Line(ListDeclaration()));
    // rulesAtLevel.push(Line(VariableDeclaration()));
    // rulesAtLevel.push(Line(ConstDeclaration()));
    // rulesAtLevel.push(Line(ExternalDeclaration()));

    // Global include can go anywhere
    // rulesAtLevel.push(Line(IncludeStatement()));

    // Normal logic / text can go anywhere
    rulesAtLevel.push(LogicLine());
    rulesAtLevel.push(LineOfMixedTextAndLogic());

    // --------
    // Breaking rules
    // Break current knot with a new knot
    if (level <= StatementLevel.Knot) {
        breakingRules.push (KnotDeclaration());
    }

    // Break current stitch with a new stitch
    if (level <= StatementLevel.Stitch) {
        breakingRules.push (StitchDeclaration());
    }

    // Breaking an inner block (like a multi-line condition statement)
    if (level <= StatementLevel.InnerBlock) {
        breakingRules.push (ParseDashNotArrow());
        breakingRules.push (parseString("}"));
    }

    return {rulesAtLevel, breakingRules};

}

export function SkipToNextLine(): Parser<string>{
    return ctx => {
        const skipResult = sequence([
            parseUntil(parseChars(["\n","\r"])),
            parseNewline()
        ])(ctx)
        if(skipResult.success){
            return empty(skipResult.ctx)
        }
        return skipResult;
    }
}

export function Line<T>(inlineParser: Parser<T>): Parser<T>{
    return ctx => {
        const result = inlineParser(ctx);
        if(!result.success) return result;

        const expected = Expect(EndOfLine(), "end of line", SkipToNextLine())(result.ctx)
        return result.hasValue ? success(expected.ctx, result.value) : empty(expected.ctx)
    }
}


//// TBD

function KnotDefinition(): Parser<string> {
    throw new Error("Function not implemented.");
}


function Choice(): Parser<unknown> {
    throw new Error("Function not implemented.");
}


function AuthorWarning(): Parser<unknown> {
    throw new Error("Function not implemented.");
}


function Gather(): Parser<string> {
    throw new Error("Function not implemented.");
}


function StitchDefinition(): Parser<string> {
    throw new Error("Function not implemented.");
}


function ListDeclaration(): Parser<unknown> {
    throw new Error("Function not implemented.");
}


function VariableDeclaration(): Parser<unknown> {
    throw new Error("Function not implemented.");
}


function ConstDeclaration(): Parser<unknown> {
    throw new Error("Function not implemented.");
}


function ExternalDeclaration(): Parser<unknown> {
    throw new Error("Function not implemented.");
}


function IncludeStatement(): Parser<unknown> {
    throw new Error("Function not implemented.");
}


function LogicLine(): Parser<string> {
    throw new Error("Function not implemented.");
}


function LineOfMixedTextAndLogic(): Parser<string> {
    throw new Error("Function not implemented.");
}


function KnotDeclaration(): Parser<string> {
    throw new Error("Function not implemented.");
}


function StitchDeclaration(): Parser<string> {
    throw new Error("Function not implemented.");
}


function ParseDashNotArrow(): Parser<string> {
    throw new Error("Function not implemented.");
}


function parseString(arg0: string): Parser<string> {
    throw new Error("Function not implemented.");
}
