import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TabsBar from "./components/Tabs";
import AdminPage from "./pages/Admin";

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
    },
    {
      path: "/admin",
      element: (
        <div>
          <AdminPage />
        </div>
      ),
    },
  ];
  return (
    <div>
      <RouterProvider router={createBrowserRouter(router)} />
    </div>
  );
};

export default App;
