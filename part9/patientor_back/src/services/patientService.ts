import { Patients } from "../../types"
import { v1 as uuid } from 'uuid';
import patientsData from "../../data/patients";
import { PatientsNoSSn, NewPatient } from "../../types";

const patients: PatientsNoSSn[] = patientsData;

const getPatientsNonSensitive = (): PatientsNoSSn[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
        return  {
                id,
                name, 
                dateOfBirth,
                gender,
                occupation
            }
        });
}

const addPatient = ( entry: NewPatient ): Patients => {
        const newPatient = {
            id: uuid(),
            ...entry
        }
        patients.push(newPatient);
        return newPatient
}

export default {
    addPatient,
    getPatientsNonSensitive
}