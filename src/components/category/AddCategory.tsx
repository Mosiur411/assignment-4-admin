import { useAddCategoryMutation } from "@/feature/categor/categorySlice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

type TCategory = {
    title: string;
    slug: string;
};

type AddCategoryProps = {
    setCategoryModel: (value: boolean) => void;
};

const AddCategory: React.FC<AddCategoryProps> = ({ setCategoryModel }) => {

    const [addCategory, { isError, isLoading, isSuccess }] = useAddCategoryMutation();

    // useForm Hook
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<TCategory>({
        defaultValues: { title: "", slug: "" }
    });

    // Watch title field
    const title = watch("title");


    const onFormSubmit = async (data: TCategory) => {
        try {
            await addCategory(data).unwrap();
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
        if (isSuccess) {
            setCategoryModel(false)
        }
    }, [title, setValue, isLoading, isSuccess]);
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                    <div className="flex justify-between ">
                        <h3 className="text-lg font-semibold mb-4 text-center">Add New Category</h3>
                        <span className="hover:text-danger text-xl cursor-pointer"
                            onClick={() => setCategoryModel(false)}
                        ><IoCloseSharp /> </span>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-xl bg-white p-6 rounded-lg shadow-md space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input {...register("title", { required: "Title is required" })} className="w-full p-2 border rounded-lg" />
                            {errors.title && <p className=" text-danger text-sm mt-2 lowercase ">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Slug</label>
                            <input {...register("slug")} className="w-full p-2 border rounded-lg bg-gray-200" readOnly />
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
                    {isError && <p className="text-red-500 text-center mt-2">Failed to add category</p>}
                    {isSuccess && <p className="text-green-500 text-center mt-2">Category added successfully!</p>}
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
