export interface Diagnose {
    code: string,
    name: string,
    latin?: string
};

export interface Patients {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
};

export type PatientsNoSSn = Omit<Patients, 'ssn'>;
export type NewPatient = Omit<Patients, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
};