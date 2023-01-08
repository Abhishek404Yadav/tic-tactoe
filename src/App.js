import React, { useState } from "react";
import Icon from "./components/Icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";

const itemArray = new Array(9).fill("empty");

function App() {
  const [isCross, setIsCross] = useState(() => true);
  const [winMsg, setWinMsg] = useState("");
// Reload function
  const reload = () => {
    setIsCross(false);
    setWinMsg("");
    itemArray.fill("empty", 0, 9);
  };
// Win logic
  const checkIsWinner = () => {
  
    // row 1
     if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    )
      setWinMsg(`${itemArray[0]} wins`);
    // row 2
    else if (
      itemArray[3] === itemArray[4] &&
      itemArray[3] === itemArray[5] &&
      itemArray[3] !== "empty"
    )
      setWinMsg(`${itemArray[3]} wins`);
    // Row 3
    else if (
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8] &&
      itemArray[7] !== "empty"
    )
      setWinMsg(`${itemArray[6]} wins`);
    // col 1
    else if (
      itemArray[0] === itemArray[3] &&
      itemArray[0] === itemArray[6] &&
      itemArray[0] !== "empty"
    )
      setWinMsg(`${itemArray[0]} wins`);
    // col 2
    else if (
      itemArray[1] === itemArray[4] &&
      itemArray[1] === itemArray[7] &&
      itemArray[1] !== "empty"
    )
      setWinMsg(`${itemArray[1]} wins`);
    // col 3
    else if (
      itemArray[2] === itemArray[5] &&
      itemArray[2] === itemArray[8] &&
      itemArray[2] !== "empty"
    )
      setWinMsg(`${itemArray[2]} wins`);
    // diaoganal 1
    else if (
      itemArray[0] === itemArray[4] &&
      itemArray[0] === itemArray[8] &&
      itemArray[0] !== "empty"
    )
      setWinMsg(`${itemArray[0]} wins`);
    // diaognal 2
    else if (
      itemArray[2] === itemArray[4] &&
      itemArray[2] === itemArray[6] &&
      itemArray[2] !== "empty"
    )
      setWinMsg(`${itemArray[2]} wins`);
    //Draw
    else if(!itemArray.includes("empty")){
      setWinMsg("draw");
    }
  };
// Updating Card
  function changeItem(itemNumber) {
    if (winMsg) {
      return toast(winMsg, { type: "success" });
    } else if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("already filled", { type: "error" });
    }
    checkIsWinner();
  }
  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {/* Message And Button Part */}
          {winMsg ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMsg}
              </h1>
              <Button color="success" block onClick={reload}>
                Reload
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-warning text-uppercase">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          {/* Grid part */}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card className="Card" onClick={() => changeItem(index)}>
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
