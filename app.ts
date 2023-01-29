import {Command} from "./src/command/command.entity";
import {CommandService} from "./src/command/command.service";

function main() {

    const program = new Command();
    const commandService = new CommandService();

    program
        .options("--filter", "counts of People and Animals by counting the number of children and appending it in the name")
        .options("--count", "filter a list of elements with only animals containing the pattern passed as argument are displayed")
        .parse(process.argv)
        .action((args: Record<string, Set<string>>) => {
            let country = require("./src/mockdata/country02.json");
            for (let argsKey in args) {
                if (argsKey === "--filter") {
                    country = commandService.filter(country, [...args[argsKey]].toString());
                } else if (argsKey === "--count") {
                    country = commandService.count(country);
                }
            }
            return country;
        })
        .print()
}

if (require.main === module) {
    main();
}