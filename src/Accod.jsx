import { Accordion } from "react-bootstrap";

function Accod({ key, Topic, Body }) {
  return (
    <Accordion defaultActiveKey={["0"]} className="accod">
      <Accordion.Item eventKey={key}>
        <Accordion.Header>{Topic}</Accordion.Header>
        <Accordion.Body>{Body}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Accod;
