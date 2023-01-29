import {Country, People} from "./command.type";

const ERROR_PEOPLE_NOT_GOOD_FORMAT = "peoples children doesn't good format in array";
const ERROR_ANIMALS_NOT_GOOD_FORMAT = "animals children doesn't good format in array";
export class CommandService {
    constructor() {}

    filter(data : Country[] , str : string) : Country[] {
        return data.map((item : Country ) => {
            if(!Array.isArray(item.people) || !item.people) throw new TypeError(ERROR_PEOPLE_NOT_GOOD_FORMAT);

            item.people = item.people.map((item: People) => {
                if(!item.animals) throw new TypeError(ERROR_ANIMALS_NOT_GOOD_FORMAT);
                item.animals = item.animals.filter(a => a.name.includes(str));
                return item;
            })

            return item;
        })
    }
    count(data : Country[]) : Country[] {
        return data.map((item: Country) => {
            if (!Array.isArray(item.people) || !item.people) throw new TypeError(ERROR_PEOPLE_NOT_GOOD_FORMAT);

            item.people = item.people.map((item: People) => {
                if (!item.animals) throw new TypeError(ERROR_ANIMALS_NOT_GOOD_FORMAT);
                item.name = `${item.name} [${item.animals.length}]`;
                return item;
            });

            item.name = `${item.name} [${item.people.length}]`;
            return item;
        })
    }
}