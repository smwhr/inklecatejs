export class Identifier extends ParsedObject {
    public name;

    constructor(name: string) {
        super()
        this.name = name;
    }

    public toString(){
        return this.name;
    }
}
