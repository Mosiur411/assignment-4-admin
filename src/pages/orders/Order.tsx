

import { useDeleteProductMutation, useGetProductsQuery } from "@/feature/product/productSlice";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ProductOrderTable from "@/components/table/order";

export default function Order() {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  const products = data?.data || [];

  // Placeholder functions for actions
  const handleEdit = (id: string) => {
    navigate(`/product/edit-product/${id}`);
  };

  const handleDelete = async (id: string) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete).unwrap();
      toast.success('Product deleted successfully');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <>
      <div className="w-full md:w-auto">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold mb-4">Order Product</h2>
          
        </div>
        <ProductOrderTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">Confirm Delete</h3>
            <p className="text-gray-7 mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-white bg-primary rounded hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-danger text-white rounded hover:bg-primary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
