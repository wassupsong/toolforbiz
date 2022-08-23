import { useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import v4 from "uuid4";

const RandomFood_Add = ({
  addFoodShow,
  setAddFoodShow,
  addFood,
  setListShow,
}) => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodDistance, setFoodDistance] = useState("");
  const [foodMainMenu, setFoodMainMenu] = useState("");
  const clearInput = () => {
    setFoodName("");
    setFoodPrice("");
    setFoodDistance("");
    setFoodMainMenu("");
  };
  const addData = (event) => {
    event.preventDefault();
    if (window.confirm("식당을 추가하시겠습니까?")) {
      try {
        addFood({
          name: foodName,
          price: foodPrice,
          distance: foodDistance,
          mainmenu: foodMainMenu,
          foodId: v4(),
        });
        alert("식당이 추가되었습니다.");
        clearInput();
        setAddFoodShow(false);
        setListShow(true);
      } catch (error) {
        alert("식당 추가에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };
  const changeInput = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") setFoodName(value);
    if (name === "mainmenu") setFoodMainMenu(value);
    if (name === "price") setFoodPrice(value);
    if (name === "distance") setFoodDistance(value);
  };
  return (
    <Modal
      show={addFoodShow}
      onHide={() => {
        setAddFoodShow(false);
        setListShow(true);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">식당 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            식당이름
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="name"
            onChange={changeInput}
            value={foodName}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            메인메뉴
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="mainmenu"
            onChange={changeInput}
            value={foodMainMenu}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            대충가격
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="price"
            onChange={changeInput}
            value={foodPrice}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            대충거리
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="distance"
            onChange={changeInput}
            value={foodDistance}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addData}>식당추가</Button>
        <Button
          onClick={() => {
            setListShow(true);
            setAddFoodShow(false);
          }}
        >
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RandomFood_Add;
