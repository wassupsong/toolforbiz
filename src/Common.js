export function getDayLabel(day, type) {
  const labelType1 = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const labelType2 = ["일", "월", "화", "수", "목", "금", "토"];
  let dayLabel = null;
  if (type === 1) {
    dayLabel = labelType1[day];
  } else if (type === 2) {
    dayLabel = labelType2[day];
  }

  return dayLabel;
}

export function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + " : " + minutes + " " + ampm;
  return strTime;
}
