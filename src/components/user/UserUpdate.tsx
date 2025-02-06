import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "@/feature/user/userSlice";

const userStatus = [
    { name: "Active", status: true },
    { name: "In-Active", status: false },
];

const UserUpdate = ({ isEditModalOpen, setIsEditModalOpen }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [updateUser, { isLoading, isSuccess, isError }] = useUpdateUserMutation();

    const onFormSubmit = async (value) => {
        try {
            const updateData = {
                id: isEditModalOpen?.data?._id,
                data: { ...value, isBlocked: JSON.parse(value.isBlocked) }, // Convert to boolean
            };
            await updateUser(updateData).unwrap();
            reset();
        } catch (error) {
            console.error("Error updating User:", error);
        }
    };

    useEffect(() => {
        if (isSuccess && isEditModalOpen.open) {
            setIsEditModalOpen({ open: false, data: null });
        }
    }, [isSuccess, setIsEditModalOpen]);

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-semibold mb-4 text-center">Update User</h3>
                        <span 
                            className="hover:text-danger text-xl cursor-pointer"
                            onClick={() => setIsEditModalOpen({ open: false, data: null })}
                        >
                            <IoCloseSharp />
                        </span>
                    </div>

                    <form 
                        onSubmit={handleSubmit(onFormSubmit)} 
                        className="max-w-xl bg-white p-6 rounded-lg shadow-md space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                defaultValue={isEditModalOpen?.data?.isBlocked}
                                {...register("isBlocked", { required: "Status is required" })}
                            >
                                {userStatus.map((dt) => (
                                    <option key={dt.name} value={String(dt.status)}>
                                        {dt.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`w-1/2 p-2 rounded-lg text-white ${isLoading ? "bg-gray-400" : "bg-primary hover:bg-secondary"}`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </form>

                    {isError && <p className="text-red-500 text-center mt-2">Failed to update User</p>}
                    {isSuccess && <p className="text-green-500 text-center mt-2">User updated successfully!</p>}
                </div>
            </div>
        </div>
    );
};

export default UserUpdate;
