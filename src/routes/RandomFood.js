import { useEffect, useState } from "react";
import {
  collection,
  setDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firebaseStore } from "../fbase";
import { ButtonGroup, Button } from "react-bootstrap";
import RandomFood_List from "../Component/RandomFood_List";
import BottomNavbar from "../Component/BottomNavbar";

const RandomFood = () => {
  const [foodList, setFoodList] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selected_slide_box, setSelected_slide_box] = useState(
    "RF_slide_box sliding"
  );
  const [selected_RF_Container, setSelected_RF_Container] =
    useState("RF_Container");
  const [listShow, setListShow] = useState(false);
  //음식 데이터 조회
  useEffect(() => {
    onSnapshot(collection(firebaseStore, "foodList"), (snapshot) => {
      let list = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setFoodList(list);
    });
  }, []);
  //난수 생성
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  //랜덤 음식 선택
  const selectMenu = () => {
    const idx = randomNumber(0, foodList.length - 1);
    setSelectedFood(foodList[idx]);
    setSelected_slide_box("RF_slide_box");
    setSelected_RF_Container("RF_Container changeColor");
  };
  //랜덤 음식 리셋
  const resetMenu = () => {
    setSelectedFood(null);
    setSelected_slide_box("RF_slide_box sliding");
    setSelected_RF_Container("RF_Container");
  };
  //랜덤음식 추가
  const addFood = async (addFoodData) => {
    await setDoc(
      doc(firebaseStore, "foodList", addFoodData.foodId),
      addFoodData
    );
  };
  const deleteFood = async (foodId) => {
    await deleteDoc(doc(firebaseStore, "foodList", foodId));
  };
  return (
    <>
      <div className={selected_RF_Container}>
        <RandomFood_List
          listShow={listShow}
          setListShow={setListShow}
          foodList={foodList}
          deleteFood={deleteFood}
          addFood={addFood}
        />
        <div className="RF_background">
          <div className="RF_Head">
            <h1>오늘 뭐 먹을까?</h1>
          </div>
          <hr width="80%" color="black" size="3" />
          <div className="RF_Main">
            <ul className={selected_slide_box}>
              {selectedFood ? (
                <h1>{selectedFood.name}</h1>
              ) : (
                foodList.map((el) => <li key={el.name}>{el.name}</li>)
              )}
            </ul>
          </div>
          <hr width="80%" color="black" size="3" />
          <div className="RF_Footer">
            {selectedFood ? (
              <>
                <p>대충가격 : {selectedFood.price} 원</p>
                <p>메인메뉴 : {selectedFood.mainmenu}</p>
                <p>대충거리 : {selectedFood.distance}</p>
              </>
            ) : (
              <>
                <p>대충가격 : ????</p>
                <p>메인메뉴 : ????</p>
                <p>대충거리 : ????</p>
              </>
            )}
          </div>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={() => setListShow(true)}>
              list
            </Button>
            <Button variant="success" onClick={selectMenu}>
              select
            </Button>
            <Button variant="danger" onClick={resetMenu}>
              reset
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default RandomFood;
