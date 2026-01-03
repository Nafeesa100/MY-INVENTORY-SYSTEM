import React, { useEffect, useState } from "react";

export default function Dashboard() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);

    useEffect(() => {
        // Fetch total products from backend
        fetch("/api/products") // Make sure backend route exists
            .then((res) => res.json())
            .then((data) => setTotalProducts(data.length))
            .catch((err) => console.log(err));

        // Fetch total categories from backend
        fetch("/api/categories") // Make sure backend route exists
            .then((res) => res.json())
            .then((data) => setTotalCategories(data.length))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>

            <div className="flex-container">
                {/* Total Products Card */}
                <div className="card">
                    <h3>Total Products</h3>
                    <p>{totalProducts}</p>
                </div>

                {/* Total Categories Card */}
                <div className="card">
                    <h3>Total Categories</h3>
                    <p>{totalCategories}</p>
                </div>
            </div>
        </div>
    );
}
