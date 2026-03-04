import { Availability } from "@/components/shared/availabilty-filter"
import { Hero } from "./components/Hero"
import List from "@/components/shared/RentList"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import rentService from "@/services/rent"





const HomePage = () => {
    const { data: recommendedData, isLoading: recommendedLoading } = useQuery({
        queryKey: [QUERY_KEYS.RECOMMENDATION_RENTS],
        queryFn: () => rentService.getAll({ type: "recommended" })
    })

    const { data: popularData, isLoading: popularLoading } = useQuery({
        queryKey: [QUERY_KEYS.POPULAR_RENTS],
        queryFn: () => rentService.getAll({ type: "popular" })
    })


    const recommendedrents = recommendedData?.data.items
    const popularrents = popularData?.data.items

    return (
        <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16 flex flex-col gap-y-6 lg:gap-y-8">
            <Hero />
            <Availability />
            <List heading="Popular Car" isLoading={popularLoading} rents={popularrents} mobileVariant="swiper" />
            <List heading="Recommendation Car" isLoading={recommendedLoading} rents={recommendedrents} mobileVariant="list" />
        </div>
    )
}

export default HomePage