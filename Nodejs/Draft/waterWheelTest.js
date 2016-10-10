import request from 'superagent'

const url = 'http://192.168.5.54'
const nasUUID = 'fd1eea70-0de8-4d15-8c99-fd4f4cc9b418'
let linkUUID = ''
let fileName = 'chi.txt'
let fileHash = '2a9b0963652a7647780dc13fd37d160720421ce8181dadd530e6a16203832f97'

let connect = new Promise(function(resolve, reject) {
  console.log("Connecting...")
  request.get(`${url}/nas/${nasUUID}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err)
        return resolve(err)

      if (res.statusCode === 204 || res.statusCode === 304)
        return resolve(null)

      resolve(res.text)
    })
})

let getLinkUUID = new Promise(function(resolve, reject) {
  console.log("Getting Link UUID...")
  request.post(`${url}/nas/${nasUUID}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err)
        return resolve(err)

      resolve(res.text)
    })
})

/*
let addNewRequest = new Promise(function(resolve, reject) {
    request.post(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}`)
      .set('Accept', 'application/json')
      .send('data',fileHash)
      .end((err, res) => {
        if (err)
          return resolve(err)

        resolve(res.text)
      })
})

let uploadFileHash = new Promise(function(resolve, reject) {
    request.post(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}`)
      .set('Accept', 'application/json')
      .attach('file',fileName)
      .field('sha256',fileHash)
      .end((err, res) => {
        if (err)
          return resolve(err)

        resolve(res.text)
      })
})
*/

connect.then(function(value) {
//  console.log("Connecting...")
  console.log(value)
  getLinkUUID.then(function(value) {
//    console.log("Getting Link UUID...")
    console.log(value)
    linkUUID = value.slice(1,-1)

    let addNewRequest = new Promise(function(resolve, reject) {
      console.log("Adding New Request...")
      request.post(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}`)
        .set('Accept', 'application/json')
        .send({'data':["2a9b0963652a7647780dc13fd37d160720421ce8181dadd530e6a16203832f97"]})
        .end((err, res) => {
          if (err)
            return resolve(err)

            resolve(res.text)
        })
    })

    addNewRequest.then(function(value) {
      console.log(value)


      let getTank = new Promise(function(resolve, reject) {
        console.log("Getting Tank Infor...")
        request.get(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err)
              return resolve(err)

              resolve(res.text)
          })
      })

      getTank.then(function(value) {
        console.log(value)
        let tankList = JSON.parse(value)
        let len = tankList.length
        for(let i = 0; i < len; i++) {
          if(tankList[i].uuid == linkUUID) {
            let tankValue = tankList[i].tanks[0]
            console.log(tankValue)
            let tankID = tankValue.uuid
            let tankResourceID = tankValue.resource[0].id
            console.log(tankID)
            console.log(tankResourceID)


      let uploadFile = new Promise(function(resolve, reject) {
        console.log("Uploading File...")
        request.post(`${url}/nas/${nasUUID}/files/${linkUUID}/${tankID}/${tankResourceID}`)
          .set('Accept', 'application/json')
          .attach('file',fileName)
          .field('sha256',fileHash)
          .end((err, res) => {
            if (err)
              return resolve(err)

            resolve(res.text)
          })
      })

      uploadFile.then(function(value) {
        console.log(value)
      })


          }
        }
      })


      /*let uploadFile = new Promise(function(resolve, reject) {
        console.log("Uploading File...")
        request.post(`${url}/nas/${nasUUID}/files/${linkUUID}`)
          .set('Accept', 'application/json')
          .attach('file',fileName)
          .field('sha256',fileHash)
          .end((err, res) => {
            if (err)
              return resolve(err)

            resolve(res.text)
          })
      })

      uploadFile.then(function(value) {
        console.log(value)
      })*/
    })

    /*
    let uploadFileHash = new Promise(function(resolve, reject) {
        request.post(`${url}/nas/${nasUUID}/waterwheel/${linkUUID}`)
          .set('Accept', 'application/json')
          .attach('file',fileName)
          .field('sha256',fileHash)
          .end((err, res) => {
            if (err)
              return resolve(err)

            resolve(res.text)
          })
    })

    uploadFileHash.then(function(value) {
      console.log(value)
    })
    */

  })

  //console.log('Finish!')
}).then(console.log('Finish!'))
