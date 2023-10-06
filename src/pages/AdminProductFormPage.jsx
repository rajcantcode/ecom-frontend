import ProductForm from "../features/admin/components/ProductForm";
import Navbar from "../features/Navbar/Navbar";
function AdminProductFormPage() {
  return (
    <div>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </div>
  );
}

export default AdminProductFormPage;
