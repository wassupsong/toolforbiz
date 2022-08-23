import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import RandomFood_Add from "./RandomFood_Add";

const RandomFood_List = ({
  listShow,
  setListShow,
  foodList,
  deleteFood,
  addFood,
}) => {
  const [addFoodShow, setAddFoodShow] = useState(false);
  const deleteData = (event) => {
    const {
      target: { name },
    } = event;
    if (window.confirm("삭제하시겠습니까?")) {
      deleteFood(name);
    }
  };
  const moveToInfo = (event) => {
    const {
      target: { name },
    } = event;
    window.open(
      `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${encodeURI(
        name
      )}`
    );
  };
  return (
    <>
      <Modal
        show={listShow}
        onHide={() => setListShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            저장된 음식 리스트
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped className="RF_Table">
            <thead>
              <tr>
                <th></th>
                <th>식당이름</th>
                <th>대충가격</th>
                <th>메인메뉴</th>
                <th>대충거리</th>
                <th>삭제버튼</th>
                <th>정보버튼</th>
              </tr>
            </thead>
            <tbody>
              {foodList.map((el, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.price}원</td>
                  <td>{el.mainmenu}</td>
                  <td>{el.distance}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={deleteData}
                      name={el.foodId}
                    >
                      삭제
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={moveToInfo}
                      name={el.name}
                    >
                      정보
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setAddFoodShow(true);
              setListShow(false);
            }}
          >
            식당추가
          </Button>
          <Button onClick={() => setListShow(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
      <RandomFood_Add
        addFoodShow={addFoodShow}
        setAddFoodShow={setAddFoodShow}
        addFood={addFood}
        setListShow={setListShow}
      />
    </>
  );
};

export default RandomFood_List;
