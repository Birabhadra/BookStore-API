const Book=require("../models/book")
const getAllBooks=async (req,res)=>{
    try{
        const bookdata=await Book.find({});
        if (bookdata){
            res.status(200).json({
                success:true,
                message:"Books fetched successfully",
                data:bookdata
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"Books not found"
            })
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"error occured"
        }) 
    }
    
}
const getBookById=async (req,res)=>{
    try{
        const bookid=req.params.id;
        const bookdata=await Book.findOne({_id:bookid});
        if (bookdata){
            res.status(200).json({
                success:true,
                message:"Book found in database",
                data:bookdata
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"Book not found"
            })
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"error occured"
        })
    }

}
const addBook=async (req,res)=>{
    try{
        const bookdata=req.body;
        const newbook=await Book.create(bookdata);
        if (newbook){        
            res.status(201).json({
                success:true,
                message:"Book added successfully",
                data:newbook
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"Book not added"
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error occured"
        })
    }

}
const updateBook=(req,res)=>{
    try{
        const bookid=req.params.id;
        const updateddata=req.body;
        const updatedBook=Book.findByIdAndUpdate(bookid,updateddata,{new:true});
        if (updatedBook){
            res.status(200).json({
                success:true,
                message:"Book updated successfully",
                data:updatedBook
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"Book not found"
            })
        }

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"error occured"
        })
    }

};
const deleteBook=async (req,res)=>{
    try{
        const bookid=req.params.id;
        const deleteBook=await Book.findByIdAndDelete(bookid);
        if (deleteBook){
            res.status(200).json({
                success:true,
                message:"Book deleted successfully",
                data:deleteBook
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"Book not found"
            })
        }

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"error occured"
        })
    }
}


module.exports={
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
    
}