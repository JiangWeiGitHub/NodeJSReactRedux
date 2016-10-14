import request from 'superagent'

async function connect(url, nasUUID) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Connecting... **********")
    request.get(`${url}/nas/${nasUUID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
console.log(`${url}/nas/${nasUUID}`)
        if (err)
          return resolve(err)

        console.log("Return Code: " + res.statusCode)

        resolve(res)
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

async function uploadFile (url, nasUUID, linkUUID, tankID, tankResourceID, fileName, fileHash) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Uploading File... **********")
    console.log("linkUUID: " +  linkUUID)
    console.log("tankID: " +  tankID)
    console.log("tankResourceID: " +  tankResourceID)
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

async function downloadFile (url, nasUUID, linkUUID, tankID, tankResourceID) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** downloading File... **********")
    request.get(`${url}/nas/${nasUUID}/files/${linkUUID}/${tankID}/${tankResourceID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err)
          return resolve(err)

        console.log("Return Code: " + res.statusCode)
        console.log(res)

        resolve(res.text)
      })
  })
}

async function setTankStatus (url, nasUUID, linkUUID, tankID, newStatus) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Setting Tank Resource Status... **********")
    request.patch(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}/${tankID}`)
      .set('Accept', 'application/json')
      .send({'status':newStatus})
      .end((err, res) => {
        if (err)
          return resolve(err)

        console.log("Return Code: " + res.statusCode)

        resolve(res.text)
      })
  })
}

async function deleteTank (url, nasUUID, linkUUID, tankID) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Deleting Tank ... **********")
    request.delete(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}/${tankID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err)
          return resolve(err)

        console.log("Return Code: " + res.statusCode)

        resolve(res.text)
      })
  })
}

async function deleteLink (url, nasUUID, linkUUID) {
  return new Promise(function(resolve, reject) {
    console.log("\n********** Deleting Link ... **********")
    request.delete(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err)
          return resolve(err)

        console.log("Return Code: " + res.statusCode)

        resolve(res.text)
      })
  })
}

export {
  connect,
  getLinkUUID,
  addNewRequest,
  getTank,
  uploadFile,
  downloadFile,
  setTankStatus,
  deleteTank,
  deleteLink,
}
