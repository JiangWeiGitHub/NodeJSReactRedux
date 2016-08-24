const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val)

const plus = a => a + 1
const mult = a => a * 2
const double = a => a * a
const run = pipeline(plus, mult, double)

console.log(run(5))

