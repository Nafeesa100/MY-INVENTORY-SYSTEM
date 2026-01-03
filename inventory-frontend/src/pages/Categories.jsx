import { useEffect, useState } from "react";
import API from "../api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await API.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const saveCategory = async () => {
    if (!form.name) return;

    if (editingId) {
      // update category
      await API.put(`/categories/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post("/categories", form);
    }

    setForm({ name: "" });
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const editCategory = (c) => {
    setForm({ name: c.name });
    setEditingId(c._id);
  };

  const deleteCategory = async (id) => {
    await API.delete(`/categories/${id}`);
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Categories</h2>

      <div className="form-container">
        <input
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
        />
        <button onClick={saveCategory}>{editingId ? "Update" : "Add"}</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>
                <button onClick={() => editCategory(c)}>Edit</button>
                <button
                  onClick={() => deleteCategory(c._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
