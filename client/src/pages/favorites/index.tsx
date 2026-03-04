import { useFavorites } from "@/hooks/use-favorites"
import { useQuery } from "@tanstack/react-query"
import rentService from "@/services/rent"
import { RentCard } from "@/components/shared/rent-card"
import Spinner from "@/components/shared/Spinner"
import { useMemo } from "react"

const FavoritesPage = () => {
    const { favorites } = useFavorites()
    const { data, isLoading } = useQuery({
        queryKey: ["all-rents"],
        queryFn: () => rentService.getAll({})
    })

    const rents = useMemo(() => {
        return data?.data.items?.filter((rent) => favorites.includes(rent._id))
    }, [data, favorites])

    if (isLoading) return <div className="flex justify-center mt-28"><Spinner /></div>

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold text-secondary mb-6">Favorites</h1>
            {rents?.length === 0 ? (
                <p className="text-secondary-300">No favorites yet.</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mx-4 md:mx-0">
                    {rents?.map((rent) => <RentCard key={rent._id} rent={rent} />)}
                </div>
            )}
        </div>
    )
}

export default FavoritesPage