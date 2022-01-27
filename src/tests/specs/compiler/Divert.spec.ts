import { MultiDivert, ParseDivertArrowOrTunnelOnwards } from "../../../compiler/parsers/inkParser/divert";
import { context } from "../../../compiler/typing/compiler";

describe("Arrow diverts", () => {
    it("parses ParseDivertArrowOrTunnelOnwards", () => {
      const ctx = context('->')
  
      const result = ParseDivertArrowOrTunnelOnwards()(ctx);
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toEqual("->");
      }
    })
  
    it("parses ->", () => {
      const ctx = context('-> miaou')
  
      const result = MultiDivert()(ctx);
      expect(result.success).toBe(true);
      if(result.success && result.hasValue){
        expect(result.value).toEqual("->");
      }
    })

    it("parses -> identifier", () => {
        const ctx = context('-> miaou')
    
        const result = MultiDivert()(ctx);
        expect(result.success).toBe(true);
        if(result.success && result.hasValue){
          expect(result.value).toEqual("->");
        }
    })
    
    it("parses -> tunnelidentifier ->", () => {
        const ctx = context('-> miaou ->')
    
        const result = MultiDivert()(ctx);
        expect(result.success).toBe(true);
        if(result.success && result.hasValue){
          expect(result.value).toEqual("->");
        }
    })

    it("parses MultiDivert False", () => {
        const ctx = context('<- miaou')
    
        const result = MultiDivert()(ctx);
        expect(result.success).toBe(false);
        if(result.success && result.hasValue){
          expect(result.value).toEqual("->");
        }
      })
  })
  