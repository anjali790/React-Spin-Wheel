import { React, useState } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

import { SpinWheel } from "./components/SpinWheel";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [spinning, setSpinning] = useState(false);
  const [winners, setWinners] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  if (window.localStorage.getItem("duration") === null)
    localStorage.setItem("duration", 10);

  const [items, setItems] = useState(
    [
      "Flat 20% off",
      "Blanc 50ml 499",
      "Flat $50 off",
      "EDT Noir $99",
      "$500 Voucher",
      "Free Gift Box",
    ]
  )

  function cancelModal() {
    setOpenModal(false);
  }

  function removeWinnerModal() {
    const winner = winners[winners.length - 1];
    const index = items.indexOf(winner);
    items.splice(index, 1);
    setItems(items);
    setOpenModal(false);
    console.log(`Removed ${winner} from entries.`);
    localStorage.setItem("itemsList", JSON.stringify(items));
  }

  function selectResultEventHandler(data) {
    if (items.length > 0 && spinning !== true) {
      var selectedIndex = data;

      setSpinning(true);

      setTimeout(() => {
        setSpinning(false);

      }, window.localStorage.getItem("duration") * 1000);

      setTimeout(() => {
        setWinners(items[selectedIndex]);

      }, window.localStorage.getItem("duration") * 1000);

      setTimeout(() => {
        setOpenModal(true);
      }, window.localStorage.getItem("duration") * 1000);
    }
  }

  return (
    <div>
      <Modal show={openModal} onHide={cancelModal} size="lg">
        <Modal.Header closeButton className="container">
          <Modal.Title>Congrats! You won: 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{winners}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={removeWinnerModal}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      <Container fluid>
        <Row>
          <Col className="mt-4" lg="6" md="auto">
            <SpinWheel
              items={items}
              onChange={selectResultEventHandler}
              spinning={spinning}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;