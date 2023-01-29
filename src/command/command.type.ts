export type People = {
    name: string,
    animals: Animal[]
}
export type Animal = {
    name: string
}
export type Country = {
    name: string,
    people: People[]
}
export type Option = {
    flag: string,
    desc: string,
}