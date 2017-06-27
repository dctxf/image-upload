const formidable = require('formidable'),
  http = require('http'),
  util = require('util'),
  fs = require('fs'),
  UPLOAD = {
    DIR: './upload/',
    PORT: 5678
  };
// 异步读取
fs.readdir(UPLOAD.DIR, function(err, files) {
  if (!files) {
    fs.mkdir(UPLOAD.DIR, function(err) {
      if (!err) {

      }
    });
  }
});
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = UPLOAD.DIR;

    form.parse(req, function(err, fields, files) {
      var data;
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
      data = {
        size: files.upload.size,
        path: files.upload.path,
        name: files.upload.name,
        type: files.upload.type,
        hash: files.upload.hash,
        lastModifiedDate: files.upload.lastModifiedDate
      };
      try {
        res.end(JSON.stringify(data));
      } catch (e) {
        res.end(e);
      }

      // res.end(util.inspect({ fields: fields, files: files }));
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="text" name="title"><br>' +
    '<input type="file" name="upload" multiple="multiple"><br>' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );
}).listen(UPLOAD.PORT);
