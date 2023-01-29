import {CommandService} from "./command.service";
import {Country} from "./command.type";
const country02 = require("../mockdata/country02.json");

describe("Command Service", () => {
    describe("filter", () => {
        it("should return the expectedResult", async () => {
            const params = {
                data: country02,
                filter: "ry"
            }
            const expectedResult = [{
                "name": "Uzuzozne",
                "people": [{"name": "Lillie Abbott", "animals": [{"name": "John Dory"}]}]
            }, {"name": "Satanwi", "people": [{"name": "Anthony Bruno", "animals": [{"name": "Oryx"}]}]}]

            const result = new CommandService().filter(params.data, params.filter);
            expect(result).toStrictEqual(expectedResult);
        })

        it("should return the same data", async () => {
            const params = {
                data: country02,
                filter: ""
            }

            const result = new CommandService().filter(params.data, params.filter);
            expect(result).toStrictEqual(country02);
        })

        it("should return empty array because array is empty", async () => {
            const params = {
                data: [],
                filter: ""
            }

            const result = new CommandService().filter(params.data, params.filter);
            expect(result).toStrictEqual(params.data);
        })

        it("should throw error because array doesn't contain people chidren", async () => {
            const params = {
                data: [{
                    "TEST": "TEST"
                }],
                filter: ""
            }

            const result = async () => {
                new CommandService().filter(params.data as unknown as Country[], params.filter);
            }
            await expect(result).rejects.toThrow("peoples children doesn't good format in array");
        })

        it("should throw error because array doesn't contain animals chidren", async () => {
            const params = {
                data: [{
                    "people": [{
                        "test": "",
                    }]
                }],
                filter: ""
            }

            const result = async () => {
                new CommandService().filter(params.data as unknown as Country[], params.filter);
            }
            await expect(result).rejects.toThrow("animals children doesn't good format in array");
        })
    })

    describe("count", () => {
        it("should return the expectedResult", async () => {
            const params = {
                data: country02
            }
            const expectedResult = [{
                "name": "Uzuzozne [1]",
                "people": [{"name": "Lillie Abbott [1]", "animals": [{"name": "John Dory"}]}]
            }, {"name": "Satanwi [1]", "people": [{"name": "Anthony Bruno [1]", "animals": [{"name": "Oryx"}]}]}]

            const result = new CommandService().count(params.data);
            expect(result).toStrictEqual(expectedResult);
        })

        it("should return empty array because array is empty", async () => {
            const params = {
                data: []
            }

            const result = new CommandService().count(params.data);
            expect(result).toStrictEqual(params.data);
        })

        it("should throw error because array doesn't contain peoples chidren", async () => {
            const params = {
                data: [{
                    "TEST": "TEST"
                }],
                filter: ""
            }

            const result = async () => {
                new CommandService().count(params.data as unknown as Country[]);
            }
            await expect(result).rejects.toThrow("peoples children doesn't good format in array");
        })

        it("should throw error because array doesn't contain animals children", async () => {
            const params = {
                data: [{
                    "people": [{
                        "test": "",
                    }]
                }],
            }

            const result = async () => {
                new CommandService().count(params.data as unknown as Country[]);
            }
            await expect(result).rejects.toThrow("animals children doesn't good format in array");
        })
    })
});