import { useEffect, useState } from "react";

interface Product {
    name: string;
    brand: string;
    price: string;
    color: string;
    size: string;
    description: string;
    categoryName: string;

}

const ProductComponent = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [productName,setProductName] = useState('');

    useEffect(() => {


        fetch(`http://localhost:1111/api/products/products/pname/${productName}`)
            .then(response => response.json())
            .then((resp: Product[]) => {
                setProducts(resp);
            })
            .catch((err) => console.error("Fetch error:", err));;

    }, [productName]);

   

    return (
        <div className="card">
            <input type="text" value={productName} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)} placeholder="productName"/>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>brand</th>
                        <th>price</th>
                        <th>color</th>
                        <th>size</th>
                        <th>description</th>
                        <th>categoryName</th>
                    </tr></thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.price}</td>
                            <td>{product.color}</td>
                            <td>{product.size}</td>
                            <td>{product.description}</td>
                            <td>{product.categoryName}</td>
                        </tr>))} </tbody>

            </table>
        </div>);
}

export default ProductComponent;