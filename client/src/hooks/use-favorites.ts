import { useState } from "react"

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>(() => {
        const stored = localStorage.getItem("favorites")
        return stored ? JSON.parse(stored) : []
    })

    const toggleFavorite = (id: string) => {
        setFavorites((prev) => {
            const updated = prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
            localStorage.setItem("favorites", JSON.stringify(updated))
            return updated
        })
    }

    const isFavorite = (id: string) => favorites.includes(id)

    return { favorites, toggleFavorite, isFavorite }
}