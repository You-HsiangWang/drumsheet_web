// 引入 Express 框架
const express = require('express');

// 建立一個 Express 應用程式
const app = express();

// 設定路由，當訪問根目錄時返回 "Hello World!"
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 監聽端口，啟動伺服器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
