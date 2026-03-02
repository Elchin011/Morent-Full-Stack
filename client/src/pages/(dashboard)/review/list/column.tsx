import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { QUERY_KEYS } from "@/constants/query-keys";
import reviewService from "@/services/review";
import { Review  } from "@/types"
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table"
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export const columns: ColumnDef<Review>[] = [
    
    { accessorKey: "rent.name", header: "Rent Name" },
    { accessorKey: "author.name", header: "User" },
    { accessorKey: "content", header: "Content" },
    {
        accessorKey: "",
        header: "Actions",
        cell: (data) => {
            const queryClient = useQueryClient()

            async function handleDelete() {
                await reviewService.remove(data.row.original._id)
                toast.success("Review deleted")
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_REVIEWS] })
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <Edit2Icon size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-500">
                            <Trash2Icon className="text-red-500" />
                            <p>Delete</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
];