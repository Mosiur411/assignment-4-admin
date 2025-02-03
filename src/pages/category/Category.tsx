import { AddCategory } from "@/components/category"
import CategoryTableTable from "@/components/table/category";
import { useGetCategoryQuery } from "@/feature/categor/categorySlice";
import { useMemo, useState } from "react"


export default function Category() {
    const [categoryModal, setCategoryModel] = useState(false)

    const { data, isLoading, error } = useGetCategoryQuery();
    const category= useMemo(() => data?.data ? data?.data : [], [data, isLoading, error])
    if (isLoading){
        <p>Loading...</p>;
    }
    if (error) return <p>Error: {JSON.stringify(error)}</p>;


    return (
        <div className="w-full md:w-auto">
            <div className="flex justify-between mb-5">
                <h2 className="text-2xl font-bold mb-4">Category List</h2>
                <button onClick={() => setCategoryModel(!categoryModal)} className="bg-primary hover:bg-secondary text-white font-bold py-1 px-4 rounded">
                    Add Category
                </button>
            </div>
            {
                categoryModal && <AddCategory
                    setCategoryModel={setCategoryModel}
                />
            }
            <CategoryTableTable category={category}/>

        </div>
    )
}

