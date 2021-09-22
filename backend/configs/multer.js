const multer = require('multer')

exports.key = "image"

exports.config = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,'./images/')
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1]
            cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
        }
    }),
    fileFilter (req, file, cb)  {
        const image = file.mimetype.startsWith("image/")
        if(image) {
            cb(null, true)
        } else {
            cb({message: "Please upload only image"}, false)
        }
    }
}