function objToArr(obj) {
  // TODO: objToArr(obj)의 리턴 배열은 arr와 같은 요소를 가지고 있어야 한다.
  const result = []
  for (let keys of Object.keys(obj)) {
    result.push([keys, obj[keys]])
  }
  return result;
}

 function arrToObj(arr) {
  // TODO: arrToObj(arr)의 리턴 객체는 obj와 같은 키와 속성을 가지고 있어야 한다.
  let result = {};
  for(let keys of arr){
    result[keys[0]] = keys[1];
  }
  return result
}

function objArrToArrArr(objArr) {
  // TODO: objArrToArrArr([obj, obj, obj])의 리턴 배열은 [arr, arr, arr]와 같은 요소를 가지고 있어야 한다.
  const result = []

  // 배열에서 객체를 하나씩 가져온다.
  for(let obj of objArr) {
    // 가져온 객체를 배열로 push한다.
      let tempArr = [];
    for (let keys of Object.keys(obj)) {
      tempArr.push([keys, obj[keys]]);
    }
      result.push(tempArr);
  }

  return result;
}