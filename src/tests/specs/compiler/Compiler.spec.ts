import { Compiler } from "../../../compiler/Compiler";

// describe("Compiler", () => {
//   testsUtils.allTestFiles().forEach( ([category, filename]) => {
//       it( `${category} - ${filename}`, () => {
//           testsUtils.compareOutputFor(filename, category)
//       })
//   })
// })

describe("Dev Compiler", () => {

  it("hello world", () => {
    const text = (`Hello World...`);

    const compiler = new Compiler(text);
    const _parsed = compiler.Parse();

    console.log(_parsed);

    expect(true).toBe(true);

  })

  it("two lines", () => {
    const text = (`Hello World...
    Brave new World...`);

    const compiler = new Compiler(text);
    const _parsed = compiler.Parse();

    console.log(_parsed);

    expect(true).toBe(true);
    
  })
  

  it("basic ink source", () => {

    const text = (`Once upon a time...

    * There were two choices.
    * There were four lines of content.
    
    - They lived happily ever after.
        -> END
     
`);

    const compiler = new Compiler(text);
    const _parsed = compiler.Parse();

    console.log(_parsed);

    expect(true).toBe(true);
  })

  it("finds a divert", () => {

    const text = (`
    -> next
    
    === next
    There were no choices.
    -> END
     
`);

    const compiler = new Compiler(text);
    const _parsed = compiler.Parse();

    console.log(_parsed);

    expect(true).toBe(true);
  })

})
