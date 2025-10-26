import { Offcanvas } from "react-bootstrap";
import "./Styles/navbar.css";
function Offacnvas({ show, handleClose, Heading, Body }) {
  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
        style={{ maxWidth: "100%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{Heading}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{Body}</Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
export default Offacnvas;
