
export default function Home() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Orders', value: 120 },
          { title: 'Pending Orders', value: 15 },
          { title: 'Completed Orders', value: 105 },
          { title: 'Total Revenue', value: '$15,000' }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-xl text-center">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-2xl font-bold text-blue-600">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="mt-8 bg-white p-6 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((order) => (
              <tr key={order} className="border-b">
                <td className="p-2">#00{order}</td>
                <td className="p-2">John Doe</td>
                <td className="p-2 text-green-600">Completed</td>
                <td className="p-2">$250</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
