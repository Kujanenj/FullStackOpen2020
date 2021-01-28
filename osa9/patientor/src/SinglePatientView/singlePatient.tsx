import React from "react";
import axios from "axios";
import { Container,Button} from "semantic-ui-react";
import { useParams } from "react-router";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setSinglePatient, useStateValue } from "../state";
import SinglePatientEntries from "./singlePatientEntries";
import { EntryFormValues } from "../AddEntryModal/addEntryForm";
import AddEntryModal from "../AddEntryModal";

const SinglePatientView: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  //const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();
  const singlePatient = patients[id];

  React.useEffect(() => {
    const fetchPatient = async () => {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setSinglePatient(patient));
    };
    if (!singlePatient || !singlePatient.ssn) {
      fetchPatient();
    }
  }, [dispatch, id, singlePatient]);
  if (!singlePatient || !singlePatient.ssn) {
    return <div></div>;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${singlePatient.id}/entries`,
        values
      );
      dispatch(setSinglePatient(newPatient));
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Single Patient</h3>
      </Container>
      {singlePatient.name}
      <br></br>
      {singlePatient.ssn}
      <br></br>
      {singlePatient.occupation}
      <br></br>
      {singlePatient.gender}
      <br></br>
      <SinglePatientEntries
        entries={singlePatient.entries}
      ></SinglePatientEntries>
      <br></br>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      ></AddEntryModal>
      <Button onClick={() => openModal()}>Add New entry</Button>
    </div>
  );
};

export default SinglePatientView;
