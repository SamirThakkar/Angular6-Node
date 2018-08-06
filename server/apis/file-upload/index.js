'use strict';
const request = require('request'),
  __lodash = require('lodash'),
  q = require('q'),
  async = require('async'),
  fs = require('fs'),
  moment = require('moment'),
  multer = require('multer'),
  mailer = require('../../utils/send-mail');
let upload = multer({dest: './uploads'});


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let mimeType = file.mimetype.split('/');
    console.log('----------mimeType--------', mimeType);
    // if (mimeType[0] === 'image') {
    cb(null, config.root + '/uploads/');
    // }
  },
  filename: function (req, file, cb) {
    let mimefl = file.mimetype.split('/');
    let fileName = file.originalname.split(' ').join('-');
    cb(null, file.fieldname + '-' + Date.now() + '.' + mimefl[1]);//file name appended for extension
  }
});

let uploadFile = multer({
  storage: storage,
  limits: {fileSize: 1073741824},
  fileFilter: function (req, file, cb) {
    console.log('file is ------>', file, req.body);
    let mimeType = file.mimetype.split('/');
    console.log(mimeType);
    if (file.fieldname === 'elementContent') {
      //let contentType,fieldname;
      //let reqObj=req.body;
      /*if(req.body && req.body.element)
           reqObj=req.body.element;*/

      /* if(file.fieldname=='elementContent') {
           contentType = reqObj.contentType;
           fieldname='Element Content';
       }
       else {
           contentType = reqObj.hint.contentType;
           fieldname='Hint Content';
       }*/

      //if(mimeType[0]==contentType)
      cb(null, true);
      //else
      //  cb(fieldname+" should be "+contentType,false);
    }
  }
}).fields([{name: 'elementContent', maxCount: 1}]);


/**
 * @Class FileUploadController
 * @description class to manage the file upload
 */
class FileUploadController {
  constructor(app) {
    app.post('/api/upload-file', this.fileUpload);
  }

  /**
   * @method fileUpload
   * @description function to upload file.
   * @param req
   * @param res
   */
  fileUpload(req, res) {

    uploadFile(req, res, (err, result) => {
      if (err) {
        console.log(err);
        res.sendError(err);
      } else {
        let fileName = req.files.elementContent[0].filename;
        console.log('fileName', fileName);
        res.sendResponse(200);


      }
    });


  }


  /**
   * @method prepareEmail
   * @description function to prepare email.
   */
  static prepareEmail() {
    fs.readFile(filepath, function (err, fileData) {
      if (err) {
        console.log('No such file found');
      }
      else {
        let emailObj = {
          subject: 'Testing mail', // Subject line
          text: 'This is a testing mail',
          attachments: {
            'filename': filename,
            'content': fileData
          }
        };
        mailer.SendMail(emailObj).then(function (err, resp) {
          console.log('Mail sent successfully.');
          fs.unlinkSync(filepath); //delete file after sending mail
          console.log('Remove csv file.');
        }).catch(function (sendEmailError) {
          console.log('error', sendEmailError);
        });
      }
    });
  }

}

module.exports = FileUploadController;
