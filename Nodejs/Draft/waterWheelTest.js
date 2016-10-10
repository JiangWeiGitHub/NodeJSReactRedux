import request from 'superagent'

const url = 'http://192.168.5.54'
const nasUUID = 'a1ce3758-2749-4bd6-890a-4fa905fbe7fe'
let linkUUID = ''
let fileName = 'chi.txt'
let fileHash = '2a9b0963652a7647780dc13fd37d160720421ce8181dadd530e6a16203832f97'

async function connect(url, nasUUID) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Connecting... **********")
    request.get(`${url}/nas/${nasUUID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err)
          return resolve(err)

        console.log("Return Code: " + res.statusCode)

        resolve(res.text)
      })
  })
}

async function getLinkUUID (url, nasUUID) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Getting Link UUID... **********")
    request.post(`${url}/nas/${nasUUID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err)
          return resolve(err)
        
        console.log("Return Code: " + res.statusCode)

        resolve(res.text)
      })
  })
}

async function addNewRequest (url, nasUUID, linkUUID, fileHash) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Adding New Request... **********")
    request.post(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}`)
      .set('Accept', 'application/json')
      .send({'data':[fileHash]})
      .end((err, res) => {
        if (err)
          return resolve(err)

        console.log("Return Code: " + res.statusCode)

        resolve(res.text)
      })
  })
}

async function getTank (url, nasUUID, linkUUID) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Getting Tank Infor... **********")
    request.get(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err)
          return resolve(err)

        console.log("Return Code: " + res.statusCode)

        resolve(res.text)
      })
  })
}

async function uploadFile (url, nasUUID, linkUUID, tankID, tankResourceID) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Uploading File... **********")
    request.post(`${url}/nas/${nasUUID}/files/${linkUUID}/${tankID}/${tankResourceID}`)
      .set('Accept', 'application/json')
      .attach('file',fileName)
      .field('sha256',fileHash)
      .end((err, res) => {
        if (err)
          return resolve(err)

        console.log("Return Code: " + res.statusCode)

        resolve(res.text)
      })
  })
}

connect(url, nasUUID).then( function (value) {
  console.log("Return Text: " + value)
})
.then( function (value) {
  getLinkUUID(url, nasUUID).then( function (value) {
    console.log("Return Text: " + value)

    return value
  })
  .then( function (value) {
    linkUUID = value.slice(1,-1)
    addNewRequest (url, nasUUID, linkUUID, fileHash).then( function (value) {
      console.log("Return Text: " + value)

      return value
    })
    .then( function (value) {
      let tankList = JSON.parse(value)
      let tankID = tankList.uuid
      let tankResourceID = tankList.resource[0].id

      uploadFile (url, nasUUID, linkUUID, tankID, tankResourceID).then( function (value) {
        console.log("Return Text: " + value)
      })
    })
  })
})