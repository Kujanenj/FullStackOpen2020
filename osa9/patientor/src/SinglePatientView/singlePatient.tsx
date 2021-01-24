import React from "react";
import axios from "axios";
import { Container} from "semantic-ui-react";
import { useParams } from "react-router";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setSinglePatient, useStateValue } from "../state";

const SinglePatientView: React.FC = () => {
  //const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();
  const singlePatient = patients[id];
  React.useEffect(() => {
    const fetchPatient = async () => {
      console.log("Getting someding");
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setSinglePatient(patient));
    };
    if (!singlePatient||!singlePatient.ssn) {
      fetchPatient();
    }
  }, [dispatch,id,singlePatient]);
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
