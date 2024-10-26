import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as product_idl, canisterId as product_id } from "dfx-generated/product";

const agent = new HttpAgent();
const product = Actor.createActor(product_idl, { agent, canisterId: product_id });

async function addProduct() {
    const name = document.getElementById("name").value;
    const price = parseInt(document.getElementById("price").value);
    const description = document.getElementById("description").value;
    const productId = await product.addProduct(name, price, description);
    alert("Product added with ID: " + productId);
    loadProducts();
}

async function loadProducts() {
    const products = await product.getAllProducts();
    const productListDiv = document.getElementById("productList");
    productListDiv.innerHTML = "";
    products.forEach(p => {
        productListDiv.innerHTML += `<p>ID: ${p.id}, Name: ${p.name}, Price: ${p.price}, In Stock: ${p.inStock}</p>`;
    });
}

window.onload = loadProducts;
