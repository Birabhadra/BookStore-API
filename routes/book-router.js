const express=require('express');
const{getAllBooks,getBookById,addBook,updateBook,deleteBook}=require("../controllers/book-controller")
const router=express.Router();

//routes
router.get('/',(req,res)=>{
    res.send("Ok")
})
router.get('/get',getAllBooks)
router.get('/get/:id',getBookById)
router.post('/add',addBook)
router.put('/update/:id',updateBook)
router.delete('/delete/:id',deleteBook)

module.exports=router;