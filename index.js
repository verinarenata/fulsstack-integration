//import library express.js
const express = require("express");
const bodyParser = require("body-parser"); //panggil library
const cors = require("cors");
const app = express(); //panggil function express di library

app.use(cors());

// Add middleware to parse JSON request bodies , panggil middlewarenya
app.use(bodyParser.json()); //for parsing application json

//vreate logger middleware function
function LoggerMiddleware(req, res, next) {
  console.log(`Request received at: ${new Date()}`);
  next(); //untuk ngelanjutin ke proses selanjutnya
}
//sebelum hit api customer get dan post harus ngelewatin logger middleware, bukan buat login tapi untuk ngecek dia sudah login ato belum
// app.use(LoggerMiddleware);

//create handling HTTP GET ALL CUSTOMER
app.get("/api/customers", (req, res) => {
  const { keyword, category, limit } = req.query; //request query string lebih ke searching, category, pagination, dll, by keyword, category, limit
  res.status(200).json({
    message: "get data",
    data: [
      {
        name: "verina renata",
        email: "renataverina@gmail.com",
        role: "software engineer",
      },
      {
        name: "arif putra",
        email: "arifputra@gmail.com",
        role: "safety engineer",
      },
      {
        name: "vivian talita",
        email: "viviantalita@gmail.com",
        role: "student",
      },
    ],
    pagination: {
      total_record: 100,
      current_page: 1,
      total_pages: limit,
    },
    search: {
      keyword: keyword,
      category: category,
    },
  });
});

//create handling HTTP POST ADD CUSTOMERS
app.post("/api/customers", LoggerMiddleware, (req, res) => {
  const { name, email, role } = req.body;
  res.status(201).json({
    message: "create data berhasil",
    data: {
      name: name,
      email: email,
      role: role,
    },
  });
}); //res.send(`thank you, ${name} with email: ${email} and role: ${role}. we have received your submiss

//create handling HTTP GET DETAIL CUSTOMERS
app.get("/api/customers/:id", (req, res) => {
  const customerID = req.params.id; //biasanya buat get detail, karena spesifik [satu] request params by id customer
  res.status(200).json({
    message: "get success",
    data: {
      customerID: customerID,
      name: "verina renata",
      email: "renataverina@gmail.com",
      role: "software engineer",
    },
  });
});

//define variable port on 3000
//buat variabel dan nampilin di port yg diinginkan
const port = 3000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
