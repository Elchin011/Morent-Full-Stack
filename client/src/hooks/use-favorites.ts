import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useSelector } from "react-redux"
import { selectUserData } from "@/store/features/userSlice"

interface FavoritesStore {
    favoritesByUser: Record<string, string[]>
    toggleFavorite: (userId: string, id: string) => void
}

const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            favoritesByUser: {},
            toggleFavorite: (userId, id) => {
                const prev = get().favoritesByUser[userId] || []
                const updated = prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id]
                set({ favoritesByUser: { ...get().favoritesByUser, [userId]: updated } })
            }
        }),
        { name: "favorites-storage" }
    )
)

export const useFavorites = () => {
    const { user } = useSelector(selectUserData)
    const userId = user?._id || "guest"
    const { favoritesByUser, toggleFavorite } = useFavoritesStore()
    const favorites = favoritesByUser[userId] || []

    return {
        favorites,
        toggleFavorite: (id: string) => toggleFavorite(userId, id),
        isFavorite: (id: string) => favorites.includes(id)
    }
}