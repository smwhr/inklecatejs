import { ContentTextNoEscape } from "../../../compiler/parsers/inkParser/content";
import { Line } from "../../../compiler/parsers/inkParser/statements";
import { Spaced } from "../../../compiler/parsers/inkParser/whitespace";
import { OneOf } from "../../../compiler/parsers/stringParser/any";
import { interleave } from "../../../compiler/parsers/stringParser/interleave";
import { sequence } from "../../../compiler/parsers/stringParser/sequence";
import { str, parseUntil } from "../../../compiler/parsers/stringParser/string";
import { context } from "../../../compiler/typing/compiler";

describe("Unit blocks", () => {
    it("parses sequence", () => {
      const ctx = context("cow says moo");
  
      const cowSentence = sequence([Spaced(str("cow")), Spaced(str("says")), Spaced(str("moo"))]);
      const result = cowSentence(ctx)
      
      expect(result.success).toBe(true);
    })
  
    it("parses OneOf", () => {
        const ctx = context("cow says miaou");
        const cow = Spaced(str("cow"));
        const says = Spaced(str("says"));
        const moo = Spaced(str("moo"));
        const meuh = Spaced(str("meuh"));
        const miaou = Spaced(str("miaou"));
  
        const cowSentence = sequence([
                                        cow, 
                                        says, OneOf([moo, meuh, miaou])]);
        const result = cowSentence(ctx)
        
        expect(result.success).toBe(true);
    })
  
    it("parses until", () => {
      const ctx = context(`some text and then an arrow 
    -> happens `);
      const untilArrow = parseUntil(str("->"));
  
      const result = untilArrow(ctx);
      
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toBe("some text and then an arrow \n    ");
        expect(result.ctx.index).toBe(33);
  
      }
    });
  
    it("parses interleave 1", () => {
      const ctx = context(`ABAB`)
      const interleaveAB = interleave(str("A"), str("B"));
      const result = interleaveAB(ctx);
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toEqual(["A","B","A","B"]);
      }
    })
    it("parses interleave 2", () => {
      const ctx = context(`ABABA`)
      const interleaveAB = interleave(str("A"), str("B"));
      const result = interleaveAB(ctx);
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toEqual(["A","B","A","B", "A"]);
      }
    })
    it("parses interleave 2", () => {
      const ctx = context(`ABABACABABA`)
      const interleaveAB = interleave(str("A"), str("B"), str("C"));
      const result = interleaveAB(ctx);
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toEqual(["A","B","A","B","A"]);
      }
    })
  
    it("parses Line 1", () => {
      const ctx = context(`moo`)
      const result = Line(str('moo'))(ctx)
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toEqual("moo");
      }
    })
  
    it("parses Line 2", () => {
      const ctx = context(`moo
    suivi d'une autre`)
      const result = Line(str('moo'))(ctx)
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toEqual("moo");
        expect(result.ctx.index).toEqual(4);
      }
    })
  
    it("parses ContentTextNoEscape", () => {
      const ctx = context(`moo
        suivi d'une autre`)
  
      const result = ContentTextNoEscape()(ctx)
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toEqual("moo");
        expect(result.ctx.index).toEqual(3);
      }
    })
  
    it("parses Line(ContentTextNoEscape)", () => {
      const ctx = context(`mooooo
suivi d'une autre
et une 3e`)
  
      const result = Line(ContentTextNoEscape())(ctx)
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toEqual("mooooo");
        expect(result.ctx.index).toEqual(7);
      }
  
      const result2 = Line(ContentTextNoEscape())(result.ctx)
      expect(result2.success).toBe(true);
      if(result2.success && result2.hasValue){
        expect(result2.value).toEqual("suivi d'une autre");
        expect(result2.ctx.index).toEqual(25);
      }
    })
  
    
  
  })