import React from "react";
import { Entry } from "../types";

interface singlePatientEntriesProps {
  entries: Entry[];
}
interface singleEntryProps {
  entry: Entry;
}
const SingleEntry: React.FC<singleEntryProps> = ({ entry }) => {
  switch (entry.type) {
    case "OccupationalHealthcare":
        return (
            <div>
              {entry.description}
              {entry.diagnosisCodes?.map((diagnose) => (
                <div key = {diagnose}>{diagnose}</div>
              ))}
            </div>
          );
    case "Hospital":
        return (
            <div>
              {entry.description}
              {entry.diagnosisCodes?.map((diagnose) => (
                <div key = {diagnose}>{diagnose}</div>
              ))}
            </div>
          );
    case "HealthCheck":
      return (
        <div>
          {entry.description}
          {entry.diagnosisCodes?.map((diagnose) => (
            <div key = {diagnose}>{diagnose}</div>
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
