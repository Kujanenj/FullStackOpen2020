import React from "react";
import { Entry } from "../types";

import {  useStateValue } from "../state";

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
              {entry.diagnosisCodes?.map((diagnose) => (
                <div key = {diagnose}>{diagnose} 
                    <br></br>
                    {diagnoses[diagnose]?.name}
                
                </div>
              ))}
            </div>
          );
  }
};
const SinglePatientEntries: React.FC<singlePatientEntriesProps> = ({
  entries,
}) => {
  return (
    <div>
      <h2>Entries:</h2>
      {entries.map((patientEntry) => (
        <SingleEntry key={patientEntry.id} entry={patientEntry}></SingleEntry>
      ))}
    </div>
  );
};
export default SinglePatientEntries;
