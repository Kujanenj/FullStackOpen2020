import React from "react";
import { Entry } from "../types";
import { Icon, Segment } from 'semantic-ui-react'
import {  useStateValue } from "../state";
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
interface singlePatientEntriesProps {
  entries: Entry[];
}
interface singleEntryProps {
  entry: Entry;
}
const SingleEntry: React.FC<singleEntryProps> = ({ entry }) => {
      const [{ diagnoses }] = useStateValue();
  switch (entry.type) {
    case "OccupationalHealthcare":
        return (
            <div>
              {entry.description}
              <Icon name='building' size='large' />
              {entry.diagnosisCodes?.map((diagnose) => (
                <div key = {diagnose}>{diagnose} 
                    <br></br>
                    {diagnoses[diagnose]?.name}
                
                </div>
              ))}
            </div>
          );
    case "Hospital":
        return (
            <div>
              {entry.description}
              <Icon name='hospital' size='large' />
              {entry.diagnosisCodes?.map((diagnose) => (
                <div key = {diagnose}>{diagnose} 
                    <br></br>
                    {diagnoses[diagnose]?.name}
                
                </div>
              ))}
            </div>
          );
    case "HealthCheck":
        return (
            <div>
              {entry.description}
              <Icon name='heart' size='large' />
              {entry.diagnosisCodes?.map((diagnose) => (
                <div key = {diagnose}>{diagnose} 
                    <br></br>
                    {diagnoses[diagnose]?.name}
                
                </div>
              ))}
            </div>
          );
          default:
              return assertNever(entry)
  }
};
const SinglePatientEntries: React.FC<singlePatientEntriesProps> = ({
  entries,
}) => {
  return (
    <div>
      <h2>Entries:</h2>
      {entries.map((patientEntry) => (
         <Segment key={patientEntry.id} >
        <SingleEntry entry={patientEntry}></SingleEntry>
        </Segment>
      ))}
    </div>
  );
};
export default SinglePatientEntries;
