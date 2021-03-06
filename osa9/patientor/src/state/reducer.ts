import { State } from "./state";

import { Diagnose, Patient } from "../types";
export const setPatientList  = (patients : Patient[]) :  Action=> {
    return { type: "SET_PATIENT_LIST", payload: patients };
};
export const setSinglePatient = (patient : Patient) : Action=>{
  return {type: "SET_SINGLE_PATIENT",payload:patient}
}
export const addPatient = (patient : Patient) : Action =>{
  return {type: "ADD_PATIENT",payload:patient}
}
export const setDiagnoses = (diagnoses : Diagnose[]) : Action =>{
  return {type: "SET_DIAGNOSES",payload:diagnoses}
}


export type Action =
  |{
    type: "SET_DIAGNOSES",
    payload: Diagnose[]
  }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  |{
    type: 'SET_SINGLE_PATIENT',
    payload: Patient
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case 'SET_SINGLE_PATIENT':
        const newMap = {...state.patients}
        newMap[action.payload.id]=action.payload
        return{
          ...state,
          patients:newMap
        }
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
