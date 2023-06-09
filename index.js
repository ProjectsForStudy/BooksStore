import  express  from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express() 

const db = mysql.createConnection({
   /*  host:"localhost",
    user:"root",
    password:"12483615Ss.",
    database:"test"   */
     host:"185.151.245.185",
    user:"Kostya",
    password:"12483615Ss.",
    database:"test"   
});

app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
    res.json("This is backend!");
});

/* Вывод строк в json */
app.get("/books", (reg,res)=> {
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

/* Вывод строки с сортировкой по id */
/* function say(word){
  app.get("/books", (reg,res)=> {
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
  });
} */



/* Добавление в таблицу строки */
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully");
    });
});

/* Удаление строки */

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  /* Обновление строки */

  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8800, () => {
    console.log("Connected to backend")
});
