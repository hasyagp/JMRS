const admin = require('firebase-admin')
const path = require('path');


// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, "gothic-protocol-321711-e99c50293309.json")),
    storageBucket: "gothic-protocol-321711.appspot.com"
})

// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
    bucket
}