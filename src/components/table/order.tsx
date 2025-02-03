import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { TProduct } from "@/type/product.type";
import Button from "../ui/Button";

type ProductTableProps = {
    products: TProduct[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onAddToCart: (product: TProduct, quantity: number) => void;
};

export default function ProductOrderTable({ products, onEdit, onDelete, onAddToCart }: ProductTableProps) {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const handleIncrease = (id: string, maxQuantity: number) => {
        setQuantities((prev) => ({ ...prev, [id]: Math.min((prev[id] || 1) + 1, maxQuantity) }));
    };

    const handleDecrease = (id: string) => {
        setQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
    };

    const handleAddToCart = (product: TProduct) => {
        const quantity = quantities[product._id] || 1;
        if (quantity > 0 && quantity <= product.quantity) {
            onAddToCart(product, quantity);
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Sl</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Available Quantity</TableHead>
                    <TableHead>Price (BDT)</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product, index) => (
                    <TableRow key={product._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                            {product?.image ? (
                                <img
                                    src={product.image}
                                    alt={`${product.title} cover`}
                                    className="w-8 h-8 object-cover rounded-md"
                                />
                            ) : (
                                <div>No image</div>
                            )}
                        </TableCell>
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell>{product.author}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Button size="sm" onClick={() => handleDecrease(product._id)}>-</Button>
                                <span>{quantities[product._id] || 1}</span>
                                <Button size="sm" onClick={() => handleIncrease(product._id, product.quantity)}>+</Button>
                            </div>
                        </TableCell>
                        <TableCell className="flex gap-2 justify-center">
                            <Button size="sm" onClick={() => handleAddToCart(product)} disabled={(quantities[product._id] || 1) > product.quantity}>
                                Add to Cart
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
