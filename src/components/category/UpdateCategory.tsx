import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useUpdateCategoryMutation } from "@/feature/categor/categorySlice";

const UpdateCategory = ({ isEditModalOpen, setIsEditModalOpen }) => {
    const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm();
    const [updateCategory, { isLoading, isSuccess, isError }] = useUpdateCategoryMutation();

    // Watch title field for changes
    const title = watch("title");

    const onFormSubmit = async (data) => {
        try {
            const updateData = {
                id: isEditModalOpen?.data?._id,
                data: data
            }
            await updateCategory(updateData).unwrap();
            reset();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    // Auto-generate slug when title changes
    useEffect(() => {
        if (title) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-") // Replace spaces/special characters with '-'
                .replace(/^-+|-+$/g, ""); // Trim leading/trailing '-'
            setValue("slug", generatedSlug);
        }
    }, [title, setValue]); // Depend on title so slug updates when title changes

    useEffect(() => {
        if (isSuccess) {
            setIsEditModalOpen(false); // Close modal after success
        }
    }, [isSuccess, setIsEditModalOpen]);

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                    <div className="flex justify-between ">
                        <h3 className="text-lg font-semibold mb-4 text-center">Update Category</h3>
                        <span className="hover:text-danger text-xl cursor-pointer"
                            onClick={() => setIsEditModalOpen(false)} // Correct function call
                        ><IoCloseSharp /> </span>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-xl bg-white p-6 rounded-lg shadow-md space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input {...register("title", { required: "Title is required" })}
                                defaultValue={isEditModalOpen?.data?.title}
                                className="w-full p-2 border rounded-lg" />
                            {errors.title && <p className=" text-danger text-sm mt-2 lowercase ">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Slug</label>
                            <input {...register("slug")}
                                defaultValue={isEditModalOpen?.data?.slug}
                                className="w-full p-2 border rounded-lg bg-gray-200" readOnly />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`w-1/2 p-2 rounded-lg text-white ${isLoading ? 'bg-gray-400' : 'bg-primary hover:bg-secondary'}`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </form>
                    {isError && <p className="text-red-500 text-center mt-2">Failed to update category</p>}
                    {isSuccess && <p className="text-green-500 text-center mt-2">Category updated successfully!</p>}
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
