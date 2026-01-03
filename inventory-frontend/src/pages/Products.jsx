import { useEffect, useState } from "react";
import API from "../api";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: "", quantity: 0, price: 0, category: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const c = await API.get("/categories");
            const p = await API.get("/products");
            setCategories(c.data);
            setProducts(p.data);
        };
        fetchData();
    }, []);

    const saveProduct = async () => {
        if (!form.name || !form.price || !form.category) return;
        if (editingId) {
            await API.put(`/products/${editingId}`, form);
            setEditingId(null);
        } else {
            await API.post("/products", form);
        }
        setForm({ name: "", quantity: 0, price: 0, category: "" });
        const p = await API.get("/products");
        setProducts(p.data);
    };

    const editProduct = (p) => {
        setForm({ name: p.name, quantity: p.quantity, price: p.price, category: p.category._id });
        setEditingId(p._id);
    };

    const deleteProduct = async (id) => {
        await API.delete(`/products/${id}`);
        const p = await API.get("/products");
        setProducts(p.data);
    };

    return (
        <div style={{ padding: "30px" }}>
            <h2>Manage Products</h2>

            <div className="form-container">
                <input placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
                <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <button onClick={saveProduct}>{editingId ? "Update" : "Add"}</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th><th>Qty</th><th>Price</th><th>Category</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>{p.quantity}</td>
                            <td>₹{p.price}</td>
                            <td>{p.category?.name}</td>
                            <td>
                                <button onClick={() => editProduct(p)}>Edit</button>
                                <button onClick={() => deleteProduct(p._id)} style={{ marginLeft: "5px" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
