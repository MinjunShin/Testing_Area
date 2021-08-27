const add2 = (n) => n + 2;
const times2 = (n) => n * 2;

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const compose = pipe(add2, times2)

compose2(3)