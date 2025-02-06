import UserTableTable from "@/components/table/user";
import { useGetUserQuery } from "@/feature/user/userSlice";
import { useMemo } from "react"

export default function Users() {

  const { data, isError, isLoading, isSuccess, error } = useGetUserQuery()
  const user = useMemo(() => data?.data ? data.data : [], [data, isError, isLoading, isSuccess])
  if (isLoading) {
    <p>Loading...</p>;
  }
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div>
      <div className="w-full md:w-auto">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold mb-4">User List</h2>
        </div>
        <UserTableTable user={user} />
      </div>

    </div>
  )
}
