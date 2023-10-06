import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/Navbar/Navbar";

function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
}

export default AdminHome;
