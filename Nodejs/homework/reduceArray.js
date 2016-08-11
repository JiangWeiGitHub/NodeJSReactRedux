let testData1 = [[1,2,3],[4,5],[6],[7,8,9],[10,11,12,13],[14,15,16],[17,18],[19,20],[21,22,23,24],[25,26],[27],[28,29,30]]

let testData2 = [1,2,3,4,5,6,7,8,9,10]

let testData3 = []

// function reduceArray(prev, current, index)
// {
//   if(index === 0)
//   {
//     prev.push([])
//     prev[prev.length - 1].push(current)
//   }
//   else
//   {
//     index % 5 ? prev[prev.length - 1].push(current) : ( prev.push([]) && prev[prev.length - 1].push(current) )
//   }

//   return prev;
// }

function reduceArray(prev, current, index)
{
  index % 5 ? prev[prev.length - 1].push(current) : prev.push([current])

  return prev;
}

let number = testData2.reduce(reduceArray, [])

let array = testData1.reduce(reduceArray, [])

let empty = testData3.reduce(reduceArray, [])

console.log("")
console.log("Number:")
console.log(number)
console.log("")
console.log("**********************************************")
console.log("")
console.log("Array:")
console.log(array)
console.log("")
console.log("**********************************************")
console.log("")
console.log("Empty:")
console.log(empty)
console.log("")

