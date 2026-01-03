import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const links = [
        { name: "Dashboard", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Categories", path: "/categories" },
    ];

    return (
        <aside>

            {links.map((link) => (
                <Link
                    key={link.name}
                    to={link.path}
                    className={`sidebar-link ${location.pathname === link.path ? "active" : ""}`}
                >
                    {link.name}
                </Link>
            ))}
        </aside>
    );
}
