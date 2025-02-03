import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button from "../ui/Button";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { useEffect, useState } from "react";
import { useDeleteCategoryMutation } from "@/feature/categor/categorySlice";
import { UpdateCategory } from "../category";

export default function CategoryTableTable({ category }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
        open: false,
        id: '',
    })
    const [isEditModalOpen, setIsEditModalOpen] = useState({
        open: false,
        data: '',
    })
    const [deleteCategory, { isLoading, isSuccess }] = useDeleteCategoryMutation()

    const handleDeleteConfirm = async () => {
        await deleteCategory(isDeleteModalOpen?.id as string)
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
                        <TableHead>Title</TableHead>
                        <TableHead>Sulg</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {category.map((ct, index) => (
                        <TableRow key={ct._id}>
                            <TableCell>{index + 1}</TableCell>

                            <TableCell className="font-medium">{ct.title}</TableCell>
                            <TableCell>{ct.slug}</TableCell>
                            <TableCell className="flex gap-2 justify-center">
                                <Button
                                    onClick={() => ct._id && setIsEditModalOpen({
                                        open: true,
                                        data: ct
                                    })}
                                    size="small" className="text-sm text-white">
                                    <EditIcon />
                                </Button>

                                <Button
                                    onClick={() => ct._id && setIsDeleteModalOpen({
                                        open: true,
                                        id: ct._id.toString()
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
                            Are you sure you want to delete this product?
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
                isEditModalOpen?.open && <UpdateCategory isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen}/>
            }



        </div>
    );
}
