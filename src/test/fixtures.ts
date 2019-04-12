export const fixtureFactory = <T>(defaults: T) => (params: Partial<T> = {}) =>
    (({ ...(defaults as any), ...(params as any) } as any) as T)

export const vinResultEntryFixture = fixtureFactory<VinResultEntry>({
    Make: "BMW",
    Model: "foo",
    ModelYear: "2019",
    Trim: "asdadsa",
    VehicleType: "foo"
})

export const vinCheckResponseFixture = fixtureFactory<VinCheckResponse>({
    Results: []
})
