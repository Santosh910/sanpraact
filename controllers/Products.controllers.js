 import ProductModal from './../model/product.modal.js'
 
 
 export const getAllProducts = (req,res) => {
    res.send("all products....")
 }

 export const getSingleProduct = (req,res) =>{
    res.send("get all produ")
 }

 export const addProduct = async (req,res) =>{
    try{
      const{name,price,category,image,id} = req.body;
      if(!name || !price || !category || !image)return res.status(200).json({success:true,message:"product added successfully"})

      const product = new ProductModal({
         name,price,category,image,userId:id
      })
      const ress = await product.save();
      console.log(ress,"response from mongodb")

      return res.status(201).json({success:true,message:"product added successfully"})
    }catch(error){
      return res.status(500).json({success:false,message:error})
    }
} 