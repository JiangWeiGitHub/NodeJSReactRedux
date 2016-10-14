import { downloadFile } from './interface'

const url = 'http://192.168.5.54'
const nasUUID = '2939b279-2380-4053-82d7-4c58c81254cb'
let linkUUID = 'a386ec16-c3bb-4ded-bc6e-0925dd0f2044'
let tankID = '0ebea2d5-06b0-4556-b8ca-96ab008f5c2f'
let tankResourceID = 'c434c7b1-b9e7-45d5-913a-80088df0db9f'

downloadFile (url, nasUUID, linkUUID, tankID, tankResourceID).then( function (value) {
  console.log("Return Text: " + value)
})
