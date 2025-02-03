import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button from "../ui/Button";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";

import { useEffect, useState } from "react";
import { useDeleteCategoryMutation } from "@/feature/categor/categorySlice";
import { UpdateCategory } from "../category";
import { useDeleteUserMutation } from "@/feature/user/userSlice";
import UserUpdate from "../user/UserUpdate";

export default function UserTableTable({ user }) {
    const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation()

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
        open: false,
        id: '',
    })
    const [isEditModalOpen, setIsEditModalOpen] = useState({
        open: false,
        data: '',
    })


    const handleDeleteConfirm = async () => {
        await deleteUser(isDeleteModalOpen?.id as string)
    }

    useEffect(() => {
        if (isSuccess) {
            setIsDeleteModalOpen({
                open: false,
                id: ""
            })
        }
    }, [isLoading, isSuccess])


    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Sl</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {user.map((data, index) => (
                        <TableRow key={data._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{data.name}</TableCell>
                            <TableCell>{data.email}</TableCell>
                            <TableCell>{data.role}</TableCell>
                            <TableCell>
                                <div>
                                    {
                                        !data.isBlocked ? <span
                                            className="bg-success text-white font-bold px-2 p-1 rounded-md"
                                        >Active</span> : <span
                                            className="bg-danger text-white font-bold px-2 p-1 rounded-md"
                                        >In-Active</span>
                                    }
                                </div>
                            </TableCell>
                            <TableCell className="flex gap-2 justify-center">
                                <Button
                                    onClick={() => data._id && setIsEditModalOpen({
                                        open: true,
                                        data: data
                                    })}
                                    size="small" className="text-sm text-white">
                                    <EditIcon />
                                </Button>

                                <Button
                                    onClick={() => data._id && setIsDeleteModalOpen({
                                        open: true,
                                        id: data._id.toString()
                                    })}
                                    size="small" className="text-sm text-white bg-danger">
                                    <DeleteIcon
                                    />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isDeleteModalOpen?.open && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4 text-center">Confirm Delete</h3>
                        <p className="text-gray-7 mb-6">
                            Are you sure you want to delete this user?
                        </p>
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen({
                                    open: false,
                                    id: ''
                                })}
                                className="px-4 py-2 text-white bg-primary rounded hover:bg-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-danger text-white rounded hover:bg-primary"
                            >
                                {
                                    isLoading ? "Loading..." : "Delete"
                                }

                            </button>
                        </div>
                    </div>
                </div>
            )}
            {
                isEditModalOpen?.open && <UserUpdate isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} />
            }

        </div>
    );
}
