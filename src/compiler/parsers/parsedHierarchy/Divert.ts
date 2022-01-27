class Divert extends ParsedObject {
    public target?: Path;
    public targetContent?: ParsedObject;
    public arguments?: Expression[];
    public runtimeDivert?: Divert;

    public isFunctionCall?: boolean;
    public isEmpty?: boolean;
    public isTunnel?: boolean;
    public isThread?: boolean;
    private isEnd?: boolean;

}