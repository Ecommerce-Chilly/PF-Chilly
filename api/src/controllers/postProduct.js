// const { Product, Category,Inventory,Discount } = require('../db');
// const dataCategory = require('../data/data-category.json')

const postProduct = async({name,price,details,category,discount,inventory}) =>{

    if(!name || !price || !details || !category || !discount || !inventory){
        throw Error("Sending incomplete information!");
    }else{
        return ('se creo')
    }   
    
};

module.exports = { postProduct }