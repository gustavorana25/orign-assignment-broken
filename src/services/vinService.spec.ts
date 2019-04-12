import { convert, filter, checkErrorResult } from "./vinService"
import { vinResultEntryFixture, vinCheckResponseFixture } from "../test/fixtures"

describe("Vin Service", () => {
    describe("Response verify", () => {
        it("return true to checkErrorResult of result when received null", () =>
            expect(checkErrorResult(null)).toBe(true))
        it("return true to checkErrorResult of result when received undefined", () =>
            expect(checkErrorResult(null)).toBe(true))

        it("return true to checkErrorResult of result when received empty data", () =>
            expect(checkErrorResult(vinCheckResponseFixture({ Results: [] }))).toBe(true))

        it("return true to checkErrorResult of result when empty Make", () =>
            expect(
                checkErrorResult(
                    vinCheckResponseFixture({
                        Results: [
                            {
                                Make: "",
                                ModelYear: "",
                                Model: "",
                                Trim: "",
                                VehicleType: ""
                            }
                        ]
                    })
                )
            ).toBe(true))

        it("return false to checkErrorResult of result when has data", () =>
            expect(
                checkErrorResult(
                    vinCheckResponseFixture({
                        Results: [
                            {
                                Make: "MAZDA",
                                ModelYear: "2010",
                                Model: "rx8",
                                Trim: "RX8",
                                VehicleType: "CAR"
                            }
                        ]
                    })
                )
            ).toBe(false))
    })

    describe("Response converter", () => {
        it("gives empty result when no data is given", () => expect(convert(null)).toEqual(null))
        it("gives empty result when invalid data is given", () => expect(convert({} as any)).toEqual(null))

        it("takes all values from Results", () =>
            expect(
                convert(
                    vinResultEntryFixture({
                        Make: "MAZDA",
                        ModelYear: "2010",
                        Model: "rx8",
                        Trim: "RX8",
                        VehicleType: "CAR"
                    })
                )
            ).toEqual({
                make: "MAZDA",
                year: 2010,
                model: "rx8",
                vehicleType: "CAR",
                trim: "RX8"
            }))
    })

    describe("Vin string filter", () => {
        it("uppercases given string", () => expect(filter("abc")).toEqual("ABC"))
        it("disallows IOQ", () => expect(filter("IOQabc")).toEqual("ABC"))
        it("disallows ioq", () => expect(filter("ioqabc")).toEqual("ABC"))
        it("trims to first 17 chars", () => expect(filter("SHHFN23607U002758abc")).toEqual("SHHFN23607U002758"))
    })
})
