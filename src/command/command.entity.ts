import {Country, Option} from "./command.type";

export class Command {
    _options: Option[]
    _args: Record<string, Set<string>>
    _value: string
    _result: Country[]
    _delimiter: string

    constructor() {
        this._args = {};
        this._options = [];
        this._value = "";
        this._result = [];
        this._delimiter = "=";
    }

    parse(argv: string[]) {
        argv.forEach((arg,index) => {
            if(index > 1) {
                const argFormat : string[] = arg.split(this._delimiter);
                if(!this._args.hasOwnProperty(argFormat[0]) && this._options.find(o => o.desc === argFormat[0])) {
                    const mySet = new Set<string>().add(argFormat[1]);
                    this._args[argFormat[0]] = mySet;
                }
            }
        })
        return this;
    }

    action(callback: (args: Record<string, Set<string>>) => Country[]) {
        const result = callback(this._args);
        this._result = result;
        return this;
    }

    options(desc: string, flag: string) {
        this._options.push({desc, flag});
        return this;
    }

    print() {
        if(this._result.length > 0) {
            console.log(JSON.stringify(this._result));
        }
    }

    getArgs() {
        return this._args;
    }
}