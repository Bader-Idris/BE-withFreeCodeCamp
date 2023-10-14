const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
const upload = multer({ dest: 'uploads/' });
// const fs = require('fs')

const postFile = (req, res) => {
  upload.single('upfile')(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'File upload failed' });
    } else {
      if (!req.file) return res.status(404).send(`<h2> please add valid file!</h2><p>go back to main <a href="/">page</a> </p>`)
      const fileInfo = req.file;//log it to see its abilities!
      // const userId = uuidv4();
      const originalFilename = fileInfo.originalname;
      // const extension = originalFilename.split('.').pop(); // Extract the file extension
      // const newFilename = `${userId}.${extension}`;

      // Rename the file to the new filename
      // const newPath = `uploads/${newFilename}`;
      // fs.renameSync(fileInfo.path, newPath);

      res.json({
        name: originalFilename,
        type: fileInfo.mimetype,
        size: fileInfo.size
      });
    }
  });
};

const getFileData = async (req, res) => {
    res.json({
      msg: 'howdy bro',
      request: req.file
    })
};
module.exports = {
  postFile,
  getFileData
};
// it's good to learn more about this multer tool,
//  especially when specifying how much maximum file size should be!