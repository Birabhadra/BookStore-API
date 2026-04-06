const express=require('express');
const authMiddleware=require('../middlewares/auth-middleware');
const adminMiddleware=require('../middlewares/role-middleware');
const {uploadImageController,fetchImagesController,deleteImageController}=require('../controllers/image-controller');
const uploadMiddleware=require('../middlewares/upload-middleware')
const router=express.Router();


router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware.single("image"),uploadImageController);
router.get('/fetch',authMiddleware,adminMiddleware,fetchImagesController);
router.delete('/:id',authMiddleware,adminMiddleware,deleteImageController);

module.exports=router;