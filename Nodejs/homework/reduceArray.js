let testData = [[1,2,3],[4,5],[6],[7,8,9],[10,11,12,13],[14,15,16],[17,18][19,20],[21,22,23,24]];

let test = [1,2,3,4,5,6,7,8,9];

function reduceArray(prev, current, index)
{
  console.log("prev: " + prev);
  console.log("current: " + current);
  console.log("index: " + index);
  (index + 1) % 5 ? prev.push(current) : console.log(index % 5);
  console.log("after: " + prev);

  return prev;
}

testData.reduce(reduceArray,[]);
