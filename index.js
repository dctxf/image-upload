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
    var form = new formidable.IncomingForm();
    form.uploadDir = UPLOAD.DIR;
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err);
      }
      console.log(files.img);
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
      // res.end(util.inspect());
      res.end(JSON.stringify({
        size: files.img.size,
        path: files.img.path,
        name: files.img.name,
        type: files.img.type,
      }));
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
