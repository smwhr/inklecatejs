import * as path from "path";
import * as fs from "fs";
import { Compiler } from "../../compiler/Compiler";

let baselinePath = path.join(
  getRootDir(),
  "src",
  "tests",
  "inkfiles"
);

const getAllFiles = function(dirPath: string, arrayOfFiles: string[]): string[] {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

export function allTestFiles() : [string, string][]{
  let originalBasePath = path.join(baselinePath, 'original');
  return getAllFiles(originalBasePath, []).map( testFilePath => {
    return testFilePath.split("/").slice(-2) as [string, string];
  })
}


export function compareOutputFor(filename: string, category: string){
    const originalPath = path.join(baselinePath, 'original', category, filename);
    const compiledPath = path.join(baselinePath, 'compiled', category, filename+".json");
    
    let compiledContent = fs.readFileSync(compiledPath, "utf-8").replace(/^\uFEFF/, ""); // Strip the BOM.
    let storyContent  = fs.readFileSync(originalPath, "utf-8");
    const _compiler = new Compiler(storyContent);
    const runtimeStory: string = _compiler.Compile()

    expect(runtimeStory).toBe(compiledContent);
}

function getRootDir() {
  if (process.env.INK_TEST === "dist" || process.env.INK_TEST === "legacy") {
    return path.join(__dirname, "..", "..");
  } else {
    return path.join(__dirname, "..", "..", "..");
  }
}
