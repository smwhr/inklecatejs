import { Compiler } from './compiler/Compiler'

declare interface Inklecate {
    Compiler: typeof Compiler
}

declare let inklecate: Inklecate
export = inklecate
