//Defining the routes 
const express = require ('express')
const router = express.Router();

//Define the object with schema that will be passed
const products = require('../models/clothes')


//create middleware to helps for not using repetitive when retrieve id
async function getProducts(req,res,next){
    let cloth

    try{
        cloth = await products.findById(req.params.id);

        if(cloth ==null){
            return res.status(400).json({message: 'cannot find products'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    //pass the products back as return
    res.cloth = cloth;

    //allowing the route to run
    next();

}


//using async because we are going to use await, and this code retrieve from db

// api/products?name= [kw], GET by name 

router.get('/products', async (req,res) =>{
    try {
        const  {name}  = req.query;
    
        const searchProd = await products.findOne({ name },'name length');
    
        if (searchProd.length === 0) {
          return res.status(404).json({ message: 'No products found with the given name' });
        }
    
        res.status(200).json(searchProd);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    })

// api/products GET
// router.get('/',async (req,res) =>{
//     try{
//         //wait for db to return the products from db
//         const clothes = await products.find()

//         //display the json file 
//         res.json(clothes)
//     }catch(err){
//         //in case there is error based from server
//         res.status(500).json ({message:err.message})
//     }
// })

// api/products/:id GET, get product by id

router.get('/:id',getProducts, async(req,res) =>{
    //simple because its already passed by middleware
    res.json(res.cloth)
})

// api/products POST, add new products
router.post('/',async (req,res) =>{
    // assign the variable with the property
    const idProd = new products({
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        quantity:req.body.quantity,
        category: req.body.category
    })
    try{
        //assign variable when the idProd variable succed added to db
        const newProd= await idProd.save()

        //send status to the user
        res.status(201).json(newProd)

    }catch(err){
        res.status(400).json({message: err.message})
    }
})


//api/products/:id PUT, to update database

router.put('/:id',getProducts,async(req,res) =>{
    //assign new value to the current products, search by id
    res.cloth.name =  req.body.name,
    res.cloth.description =  req.body.description,
    res.cloth.price = req.body.price,
    res.cloth.quantity = req.body.quantity,
    res.cloth.category =  req.body.category

    try{
        const updProd = await res.cloth.save();
        res.json(updProd)
    }catch(err){
        res.status(400).json({message:err.message})
    }

})

// api/products/:id DELETE, deletee one

router.delete('/:id', getProducts, async (req,res) =>{
    try{
        await res.cloth.deleteOne();
        res.json({message: 'Deleted one Products' })
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// api/product/ DELETE , delete all
router.delete('/',async (req,res) =>{
    try{
        await products.deleteMany();
        res.json({message: 'Deleted All!'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
    
})


module.exports = router