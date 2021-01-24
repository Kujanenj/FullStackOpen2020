import React from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";
import { useParams } from "react-router";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";

const SinglePatientView: React.FC = () => {
  //const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();
  const singlePatient = patients[id];
  console.log(id, singlePatient);
  React.useEffect(() => {
    const fetchPatient = async () => {
      console.log("Getting someding");
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: "SET_SINGLE_PATIENT", payload: patient });
    };
    if (!singlePatient||!singlePatient.ssn) {
      fetchPatient();
    }
  }, [dispatch]);
  if (!singlePatient) {
    return <div></div>;
  }
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
    </div>
  );
};

export default SinglePatientView;
