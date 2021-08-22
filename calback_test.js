//Synchronus callback
function printImmediately(print){
  print();
}

//Asychronus callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}

console.log(1);
setTimeout(() => console.log(2), 1000);
console.log(3);
printImmediately(() => console.log('hello'));
printWithDelay(() => console.log('async callback'), 2000);

// * 콜백 지옥 예제
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if((id === 'pj0014' && password === 'heart') ||
         (id === 'coder' && password === 'academy')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not Found'));
      }
    }, 2000);
  }

  getRole(user, onSuccess, onError) {
    if(user === 'pj0014') {
      onSuccess({name : 'MJ', role : 'admin'});
    } else {
      onError(new Error('no access'));
    }
  }
}


const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
  id, 
  password, 
  user => {
    userStorage.getRole(
      user, 
      userWithRole => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role}`
        );
      },
      error => {
        console.log('error')
      }
      );
  }, 
  error => {
    console.log(console.log(error))
  }
);