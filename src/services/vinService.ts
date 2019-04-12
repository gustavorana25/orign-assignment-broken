import { get } from "../utils/https"

const invalidChars = new RegExp(/[IOQ]/, "g")

export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .replace(invalidChars, "")
        .slice(0, 17)

export const validate = (vin: string): string => (vin.length < 17 ? "17 chars expected" : null)

export const convert = (_res: VinResultEntry): CarInfo => {
    return _res && _res.Make
        ? {
              make: _res.Make,
              model: _res.Model,
              year: Number(_res.ModelYear) ? Number(_res.ModelYear) : null,
              trim: _res.Trim,
              vehicleType: _res.VehicleType
          }
        : null
}

export const apiCheck = async (vin: string): Promise<CarInfo> => {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
    return get(url)
        .then((data: VinCheckResponse) => {
            if (checkErrorResult(data)) throw new Error("err")
            return convert(data.Results[0])
        })
        .catch(err => err)
}

export const checkErrorResult = (result: VinCheckResponse): boolean => {
    if (!result) return true
    if ((result.Results[0] && result.Results[0].Make === "") || result.Results.length === 0) return true
    return false
}
