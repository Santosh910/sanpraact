import productModal from './../model/product.modal.js'
import ProductModal from './../model/product.modal.js'


export const getAllProducts = async (req, res) => {
   try {
      const products = await productModal.find({}).limit(10)
      if (products.length) {
         return res.status(201).json({ products:products, message: "product found",success:true })
      }
      return res.status(401).json({ success: false, message: "products not found" })
   } catch (error) {
      return res.status(500).json({ success: false, message: error })
   }
}

export const getSingleProduct = async(req, res) => {
  try{
      const {productId} = req.body;
      if(!productId)return res.status(404).json({ success: false, message: "product id is required" })

      const product = await productModal.findById(productId).select("name -_id")

      if(product){
         return res.status(200).json({success:true,message:"product found",product:product})
      }
      return res.status(401).json({ success: false, message: "products not found" })
  }catch(error){
   return res.status(500).json({ success: false, message: error })
  }
}

export const addProduct = async (req, res) => {
   try {
      const { name, price, category, image, id } = req.body;
      if (!name || !price || !category || !image) return res.status(401).json({ success: false, message: "all data mandotory" })

      const product = new ProductModal({
         name, price, category, image, userId: id
      })
      const ress = await product.save();
      console.log(ress, "response from mongodb")

      return res.status(201).json({ success: true, message: "product added successfully" })
   } catch (error) {
      return res.status(500).json({ success: false, message: error })
   }
} 

export const filterProducts = async(req, res) => {
  try{

     const {skip,page=10,query,sorting} = req.body;

     const updateQuery = {category : query}

     const name = sorting.replace(/^-/,"")
     const order = sorting[0] == "-"?"-":"";
     const updateSorting = {[name]:`${order}1`}
   //   console.log(updateSorting)

     const products = await ProductModal.find(updateQuery).skip(skip*10).limit(page).sort({Sorting:1 })

   return res.status(201).json({ success: true, message: "products found",products })
  }catch(error){
   return res.status(500).json({ success: false, message: error })
  }
}