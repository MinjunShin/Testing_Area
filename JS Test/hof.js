let studentList = [
  {
    name: 'Anna',
    gender: 'female',
    grades: [4.5, 3.5, 4],
  },
  {
    name: 'Dennis',
    gender: 'male',
    country: 'Germany',
    grades: [5, 1.5, 4],
  },
  {
    name: 'Martha',
    gender: 'female',
    grades: [5, 4, 4, 3],
  },
  {
    name: 'Brock',
    gender: 'male',
    grades: [4, 3, 2],
  },
];

function studentReports(students) {
  // TODO: 여기에 코드를 작성합니다.
  // filter 메서드를 사용하여 여학생인 경우를 추출한다.
  let filterStu = students.filter(function(el) {
    return el.gender === 'female';
  });

  let result = filterStu.map(function(el){
    el.grades = (el.grades.reduce(function(acc, cur){
      return acc += cur;
    }))/el.grades.length;
    return el;
  });

  return result;
}

studentReports(studentList);
