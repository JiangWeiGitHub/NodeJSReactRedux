import { connect, getLinkUUID, addNewRequest, getTank, uploadFile, setTankStatus, deleteTank, deleteLink } from './interface'

const url = 'http://jiangweigithub-waterwheel.daoapp.io'
const nasUUID = '8fa7b7ce-0b10-488d-886e-e83425b2dd81'
let linkUUID = ''
let fileName = 'chi.txt'
let fileHash = '01cbbad038e528a9c751f6a7718f22113256370e69a020eb668426f25cf179e5'
let tankID = ""
let tankResourceID = ""
let newStatus = 'error'

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

        uploadFile (url, nasUUID, linkUUID, tankID, tankResourceID, fileName, fileHash).then( function (value) {
          console.log("Return Text: " + value)
        })
      })
    })
  })
})
