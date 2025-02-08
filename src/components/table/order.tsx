import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type OrderTableProps = {
    orders: any;
    onDelete: (id: string) => void;
};

export default function ProductOrderTable({ orders, onDelete }: OrderTableProps) {

    console.log('orders',orders)



    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Sl</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Items</TableHead>
                    <TableHead>TotalPrice</TableHead>
                    <TableHead>TrxID</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order:any, index:number) => (
                    <TableRow key={order._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{order.email}</TableCell>
                        <TableCell className="font-medium">{order.totalItems}</TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        <TableCell>{order.trxID}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
