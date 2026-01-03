import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const p = await API.get("/products");
            const c = await API.get("/categories");
            setProducts(p.data);
            setCategories(c.data);
            let value = p.data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            setTotalValue(value);
        };
        fetchData();
    }, []);

    return (
        <div style={{ padding: "30px" }}>
            <h2>Inventory Dashboard</h2>
            <div className="flex-container">
                <div className="card">
                    <h3>Total Products</h3>
                    <p>{products.length}</p>
                </div>
                <div className="card">
                    <h3>Total Categories</h3>
                    <p>{categories.length}</p>
                </div>
                <div className="card">
                    <h3>Total Inventory Value</h3>
                    <p>₹{totalValue}</p>
                </div>
            </div>
        </div>
    );
}
