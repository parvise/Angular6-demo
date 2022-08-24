import { ISkills } from "./ISkills";

export interface IEmployee {
    id: number,
    fullName: string,
    email: string,
    phone?: number,
    contactPrefer: string,
    skills: ISkills[];
}