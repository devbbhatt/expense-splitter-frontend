import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "🏠",
        },
        {
            name: "Groups",
            path: "/groups",
            icon: "📁",
        },
        {
            name: "Balances",
            path: "/balances",
            icon: "💰",
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "👤",
        },
    ];

    return (

       <div className="w-64 h-screen bg-gray-900 text-white p-6 shadow-xl overflow-y-auto">

            <h2 className="text-3xl font-bold mb-10 text-center">

                Expense Splitter

            </h2>

            <ul className="space-y-3">

                {
                    menuItems.map((item) => (

                        <li key={item.path}>

                            <Link
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                    location.pathname === item.path
                                        ? "bg-blue-600"
                                        : "hover:bg-gray-800"
                                }`}
                            >

                                <span className="text-xl">
                                    {item.icon}
                                </span>

                                <span className="font-medium">
                                    {item.name}
                                </span>

                            </Link>

                        </li>

                    ))
                }

            </ul>

        </div>

    );

}

export default Sidebar;