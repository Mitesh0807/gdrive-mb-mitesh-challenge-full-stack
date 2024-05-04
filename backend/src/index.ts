import express from "express";
// import cors from 'cors';
// import bodyParser from 'body-parser';
//
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Example app listening on port ", process.env.PORT || 8000);
});
