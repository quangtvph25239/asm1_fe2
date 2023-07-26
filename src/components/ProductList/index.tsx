import { ProductContext } from "../../context/ProductProvider";
import axios from "axios";
import { useContext, useEffect } from "react";

const ProductList = () => {
    const {state, dispatch} = useContext(ProductContext)
    console.log("state",state);
    
    useEffect(()=>{
        const fetchProduct = async () => {
            try{
                const { data } = await axios.get(`http://localhost:3000/products`)
                dispatch({type: "product/fetch", payload: data})
                console.log(data);
            }catch (error){}
        }
        fetchProduct();
    }, [])
    
    const addProduct = async (product: any) => {
        console.log("product", product);
        try {
            const {data} = await axios.post(`http://localhost:3000/products/`, product)
            dispatch({type: "product/add", payload: data})
        }catch (error: any){
            console.log(error.message);
        }
    }
    const updateProduct = async (product: any) => {
        try {
            const {data} = await axios.put(`http://localhost:3000/products/${product.id}`, product)
            dispatch({type: "product/update", payload: data})
        }catch (error: any){
            console.log(error.message);
        }
    }
    const removeProduct = async (id: any) => {
        try {
            const {data} = await axios.delete(`http://localhost:3000/products/${id}`)
            dispatch({type: "product/delete", payload: id})
        }catch (error: any){
            console.log(error.message);
        }
    }
    return (
        <div>
            {state?.products?.map((item: any)=>(
                <div className="font-bold text-2xl" key={item.id}>{item.name}</div>
            ))}

            <button className="border rounded-sm" onClick={()=> addProduct({name: "Product C"})}>Add Product</button>
            <button onClick={()=> updateProduct({name: "Product C update", id: 3})}>Update Product</button>
            <button onClick={()=> removeProduct(3)}>Delete Product</button>
        </div>
    )
}

export default ProductList