const express = require('express');
const app = express();
const path = require('path');
const products = require('./products.json');

console.log(products)
// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for products page
app.get('/', (req, res) => {
    // Render the 'index' template with a variable
    res.render('index', { title: 'Sample EJS Server' });
});

app.get('/products/:category', (req, res) => {
    var filteredProducts = []
    var length = 0;
    products.forEach((product)=>{
        if(product.category === req.params.category){
            length++;
           filteredProducts.push(product)
        }
    })
    if(filteredProducts.length>0){
        res.render('products', { products: filteredProducts , message:"", display:"none",length:length});
    }   else{
        res.render('products',{message:"invalid Category",display:"flex",products:[],length:length})
    }
   

});
app.get('/products', (req, res) => {
    length = products.length
    res.render('products', { products: products,message:"", display:"none" ,length : length});
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
