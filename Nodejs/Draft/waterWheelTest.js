import request from 'superagent'

const url = 'http://192.168.5.54'
const nasUUID = '2d00d149-8ea2-4ca3-bf26-063674a81c82'
let linkUUID = ''
let fileName = 'chi.txt'
let fileHash = '2a9b0963652a7647780dc13fd37d160720421ce8181dadd530e6a16203832f97'
let tankID = ""
let tankResourceID = ""
let newStatus = 'error'

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
    getTank (url, nasUUID, linkUUID).then( function (value) {
      console.log("Return Text: " + value)
    })
    
    .then( function (value) {
      addNewRequest (url, nasUUID, linkUUID, fileHash).then( function (value) {
        console.log("Return Text: " + value)

        return value
      })
      .then( function (value) {
        let tankList = JSON.parse(value)
        tankID = tankList.uuid
        tankResourceID = tankList.resource[0].id

        uploadFile (url, nasUUID, linkUUID, tankID, tankResourceID).then( function (value) {
          console.log("Return Text: " + value)
        })
        .then( function (value) {
          setTankStatus (url, nasUUID, linkUUID, tankID, newStatus).then( function (value) {
            console.log("Return Text: " + value)
          })
          .then( function (value) {
            deleteTank (url, nasUUID, linkUUID, tankID).then( function (value) {
              console.log("Return Text: " + value)
            })
            .then( function (value) {
              getTank (url, nasUUID, linkUUID).then( function (value) {
                console.log("Return Text: " + value)
              })
              .then( function (value) {
                deleteLink (url, nasUUID, linkUUID).then( function (value) {
                  console.log("Return Text: " + value)
                })
              })
            })
          })
        })
      })
    })
  })
})
