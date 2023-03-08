import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (text: string): boolean => {
    return Boolean(Date.parse(text))
};

const isGender = (params: string): params is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(params);
};

const parseString = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing value');
    }
    return value;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorect or missing date: ' + date);
    }

    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing Gender ' + gender);
    }
    return gender
};

const patientParser = (object: unknown) : NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing Data')
    }
    
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const patient : NewPatient = {
           name: parseString(object.name),
           dateOfBirth: parseDate(object.dateOfBirth),
           ssn: parseString(object.ssn),
           gender: parseGender(object.gender),
           occupation: parseString(object.occupation),
        };
        return patient;
    }

    throw new Error('data is missing')
};

export default patientParser;