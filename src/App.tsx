import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TabsBar from "./components/Tabs";
import AdminPage from "./pages/Admin";
import AdminDashBoard from "./components/Admin/DashBoard";
import AdminAuthor from "./components/Admin/Author";
import AdminBook from "./components/Admin/Book";
import CreateAuthor from "./components/Admin/Author/CreateAuthor";

const LayoutApp = () => {
  return (
    <div className="container-layout">
      <div className="main-header h-[100px]">
        <Header />
      </div>
      <div>
        <TabsBar />
      </div>
    </div>
  );
};
const App = () => {
  const router = [
    {
      path: "/",
      element: (
        <div>
          <LayoutApp />
        </div>
      ),
      errorElement: "404 Not Found",
    },
    {
      path: "/admin",
      element: (
        <div>
          <AdminPage />
        </div>
      ),
      children: [
        {
          path: "",
          index: true,
          element: <AdminDashBoard />,
        },
        {
          path: "author",
          element: <AdminAuthor />,
        },
        {
          path: "book",
          element: <AdminBook />,
        },
        {
          path: "author/create",
          element: <CreateAuthor />,
        },
      ],
    },
  ];
  return (
    <div>
      <RouterProvider router={createBrowserRouter(router)} />
    </div>
  );
};

export default App;
