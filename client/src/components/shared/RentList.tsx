import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

import { Rent } from "@/types";
import { RenderIf } from "./RenderIf";
import { RentCard } from "./rent-card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules"

type Props = {
    heading: string;
    maxCols?: number;
    isLoading?: boolean;
    rents?: Rent[]
    mobileVariant?: "swiper" | "list"
}

const List = ({ heading, maxCols = 4, isLoading = false, rents, mobileVariant = "swiper" }: Props) => {

    return (
        <div>
            <div className="flex items-center md:mx-0 mx-3 justify-between py-2.5">
                <h3 className="pl-3 lg:pl-5 text-secondary-300 font-semibold">{heading}</h3>
                <Button variant={"link"} asChild><Link to="/list">View All</Link></Button>
            </div>

            {/* Desktop */}
            <div className={`hidden md:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${maxCols} gap-4 md:gap-6 lg:gap-8`}>
                <RenderIf condition={isLoading}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                        <RentCard.Skeleton key={index} />
                    ))}
                </RenderIf>
                <RenderIf condition={!isLoading}>
                    {rents?.map((rent) => (
                        <RentCard key={rent._id} rent={rent} />
                    ))}
                </RenderIf>
            </div>

            {/* Mobile */}
            <div className="md:hidden mt-5">
                {mobileVariant === "list" ? (
                    <div className="flex flex-col gap-4 px-4">
                        {!isLoading && rents?.map((rent) => (
                            <RentCard key={rent._id} rent={rent} />
                        ))}
                    </div>
                ) : (
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 2500 }}
                        spaceBetween={16}
                        slidesPerView={1.4}
                        grabCursor={true}
                        className="px-4"
                    >
                        {!isLoading && rents?.map((rent) => (
                            <SwiperSlide key={rent._id} className="!h-auto">
                                <RentCard rent={rent} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    )
}

export default List