const express = require("express");
const path = require("path");
const app = express();
const port = 8085;

app.use(express.static(path.join(__dirname, "../public")));

// 启动服务器
app.listen(port, function () {
  console.log(`Server start on: http://127.0.0.1:${port}`);
});
