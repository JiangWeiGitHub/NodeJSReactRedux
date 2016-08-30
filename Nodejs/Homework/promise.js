function promise(score){
  return new Promise(function(resolve, reject){
    console.log("Promise Inside")

    if(score > 10){
      resolve("Large than 10")
    }
    else{
      reject("Small than 10")
    }
  })
}

let test = promise(15)

test.then(function(value){
    console.log(value)
  }, function(error){
    console.log(error)
  })

console.log("Bottom")
