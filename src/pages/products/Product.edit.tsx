import { useGetProductQuery, useUpdateProductMutation } from "@/feature/product/productSlice";
import { TProduct } from "@/type/product.type";
import { ArrowLeft } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetCategoryQuery } from "@/feature/categor/categorySlice";

const CLOUDINARY_UPLOAD_PRESET = "ecom_preset";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbtskylxt/image/upload";



export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading: isFetching } = useGetProductQuery(id || '');

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: category } = useGetCategoryQuery()

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  // if (product) {
  //   console.log(product.data);
  // }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<TProduct, "image">>();

  useEffect(() => {
    if (product) {
      reset({
        title: product.data.title,
        author: product.data.author,
        category: product.data.category?._id || "", // Ensure _id is set
        description: product.data.description,
        price: product.data.price,
        quantity: product.data.quantity,
        inStock: product.data.inStock,
      });
      setImageUrl(product.data.image || null);
    }
  }, [product, reset]);

  const uploadImage = async () => {
    if (!image) return product?.image || null;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setImageUrl(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed! Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onFormSubmit: SubmitHandler<Omit<TProduct, "image">> = async (data) => {
    try {
      const uploadedImageUrl = image ? await uploadImage() : imageUrl;

      if (!uploadedImageUrl) {
        alert("Please upload an image!");
        return;
      }

      const productData: TProduct = {
        ...data,
        image: uploadedImageUrl
      };

      await updateProduct({
        id: id!,
        data: productData
      }).unwrap();
      navigate("/product");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="w-full bg-gray-1 ">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold">Edit Bike Shop</h2>
        <button
          onClick={() => navigate("/product")}
          className="bg-primary flex items-center hover:bg-secondary text-white font-bold px-2 py-1 rounded"
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="w-full  flex justify-center py-5">
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-96 bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title <span className="text-danger">*</span></label>
            <input {...register("title", { required: "Title is required" })} className="w-full p-2 border rounded-lg" />
            {errors.title && <p className="text-danger text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author <span className="text-danger">*</span></label>
            <input {...register("author", { required: "Author is required" })} className="w-full p-2 border rounded-lg" />
            {errors.author && <p className="text-danger text-sm">{errors.author.message}</p>}
          </div>

          <select
        {...register("category", { required: "Category is required" })}
        className="w-full p-2 border rounded-lg"
      >
        <option value="">Choose Category <span className="text-danger">*</span></option>
        {category?.data?.map((ct) => (
          <option key={ct._id} value={ct._id}>
            {ct.title}
          </option>
        ))}
      </select>
      {errors.category && <p className="text-red-500">{errors.category.message}</p>}


          <div>
            <label className="block text-sm font-medium mb-2">Description <span className="text-danger">*</span></label>
            <textarea {...register("description", { required: "Description is required" })} className="w-full p-2 border rounded-lg" />
            {errors.description && <p className="text-danger text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price <span className="text-danger">*</span></label>
            <input type="number" {...register("price", { required: "Price is required" })} className="w-full p-2 border rounded-lg" />
            {errors.price && <p className="text-danger text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quantity <span className="text-danger">*</span></label>
            <input type="number" {...register("quantity", { required: "Quantity is required" })} className="w-full p-2 border rounded-lg" />
            {errors.quantity && <p className="text-danger text-sm">{errors.quantity.message}</p>}
          </div>

          <div className="flex items-center">
            <input type="checkbox" {...register("inStock")} className="mr-2" />
            <label className="text-sm font-medium">In Stock</label>
          </div>

          <div>
            <label className="block text-sm font-medium">Current Image</label>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Current product"
                className="mt-2 h-24 w-24 object-cover rounded-lg"
              />
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="w-full p-2 border rounded-lg mt-2"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
            {uploading && <p className="text-blue-500 text-sm ">Uploading...</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-1/2 p-2 rounded-lg text-white ${(isUpdating || uploading) ? 'bg-gray-400' : 'bg-primary hover:bg-secondary'}`}
              disabled={isUpdating || uploading}
            >
              {isUpdating || uploading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>


      </div>

    </div>
  );
}
