import HeartFilldeRed from "@/assets/icons/heart-filled-red.svg"
import HeartOutlined from "@/assets/icons/heart-outlined.svg"
import Fuel from "@/assets/icons/fuel.svg"
import Tranmission from "@/assets/icons/transmission.svg"
import People from "@/assets/icons/people.svg"

import { Link, useNavigate } from "react-router-dom"
import { paths } from "@/constants/paths"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Rent } from "@/types"
import { formatPrice } from "@/lib/utils"
import { useSelector } from "react-redux"
import { selectUserData } from "@/store/features/userSlice"
import { toast } from "sonner"
import { ModalEnum, useDialog } from "@/hooks/useDialog"
import { useFavorites } from "@/hooks/use-favorites"

type Props = {
    rent: Rent;
}

export const RentCard = ({ rent }: Props) => {
    const { user } = useSelector(selectUserData)
    const { openDialog } = useDialog()
    const navigate = useNavigate()

    const { _id, name, category, fuel, gearBox, images, capacity, price, discount } = rent
    const { toggleFavorite, isFavorite } = useFavorites()
    const isliked = isFavorite(_id)
    const mainImage = images[0]

    function navigateDetail() {
        navigate(paths.DETAIL(_id))
    }

    return (
        <>
            {/* DESKTOP - orijinal dəyişməz */}
            <div className="hidden md:block w-full bg-white rounded-[10px] p-4 lg:p-6">
                <div className="flex justify-between">
                    <div>
                        <Link to={paths.DETAIL(_id)} className="font-bold text-secondary-500 text-[20px] tracking-[-0.6px] hover:underline cursor-pointer">{name}</Link>
                        <p className="text-secondary-300 text-[14px] tracking-[-0.28px]">{category.name}</p>
                    </div>
                    <button className="h-fit" onClick={() => {
                        if (!user) {
                            toast.warning("Please login to add favorites")
                            openDialog(ModalEnum.LOGIN)
                            return
                        }
                        toggleFavorite(_id)
                    }}>
                        <img src={isliked ? HeartFilldeRed : HeartOutlined} alt="heart" />
                    </button>
                </div>
                <div className="flex justify-center ">
                    <Link to={paths.DETAIL(_id)} onClick={navigateDetail} className="mt-8 lg:mt-12 relative cursor-pointer block">
                        <img src={mainImage} alt="rent-car" className="w-[210px] h-32 object-contain" />
                        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
                    </Link>
                </div>
                <div className="flex items-center justify-between mt-5 lg:mt-9">
                    <div className="flex items-center gap-1.5">
                        <img src={Fuel} alt="fuel" />
                        <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">{fuel}L</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <img src={Tranmission} alt="transmission" />
                        <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">{gearBox}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <img src={People} alt="people" />
                        <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">{capacity} people</p>
                    </div>
                </div>
                <div className="flex items-center justify-between min-h-[48px] mt-3 lg:mt-6">
                    <div>
                        <p className="text-secondary-500 text-[20px] font-bold">
                            {formatPrice(discount !== 0 ? price - discount : price)}/
                            <span className="text-[14px] text-secondary-300">day</span>
                        </p>
                        {discount !== 0 && (
                            <p className="line-through text-secondary-300 text-[14px] font-bold -mt-0">
                                {formatPrice(price)}
                            </p>
                        )}
                    </div>
                    <Button asChild className="p-[22px] text-[16px] ">
                        <Link to={paths.PAYMENT(_id)} onClick={() => {
                            if (!user) {
                                toast.warning("Please login to rent a car")
                                openDialog(ModalEnum.LOGIN)
                            }
                        }}>
                            Rent Now
                        </Link>
                    </Button>
                </div>
            </div>

            {/* MOBILE - şəkil sol, məlumatlar sağ */}
            <div className="md:hidden w-full bg-white rounded-[10px]  p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <Link to={paths.DETAIL(_id)} className="font-semibold text-secondary-500 text-[16px] tracking-[-0.6px] hover:underline">{name}</Link>
                        <p className="text-secondary-300 text-[14px] tracking-[-0.28px]">{category.name}</p>
                    </div>
                    <button className="h-fit" onClick={() => {
                        if (!user) {
                            toast.warning("Please login to add favorites")
                            openDialog(ModalEnum.LOGIN)
                            return
                        }
                        toggleFavorite(_id)
                    }}>
                        <img className="w-4 h-4" src={isliked ? HeartFilldeRed : HeartOutlined} alt="heart" />
                    </button>
                </div>
                <div className="flex justify-between my-4 ">
                    <Link to={paths.DETAIL(_id)} onClick={navigateDetail} className="w-[160px] flex-shrink-0 flex items-center">
                        <img src={mainImage} alt="rent-car" className="w-full h-20 object-contain" />
                    </Link>
                    <div className="flex flex-col gap-2">

                        <div className="flex items-center gap-1">
                            <img src={Fuel} alt="fuel" className="w-3.5 h-3.5" />
                            <p className="text-secondary-300 text-[14px] font-medium">{fuel}L</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={Tranmission} alt="transmission" className="w-3.5 h-3.5" />
                            <p className="text-secondary-300 text-[14px] font-medium">{gearBox}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={People} alt="people" className="w-3.5 h-3.5" />
                            <p className="text-secondary-300 text-[14px] font-medium">{capacity} people</p>
                        </div>

                    </div>
                </div>
                <div className="flex items-center justify-between mt-12">
                    <div>
                        <p className="text-secondary-500 text-sm font-bold">
                            {formatPrice(discount !== 0 ? price - discount : price)}/
                            <span className="text-[10px] text-secondary-300">day</span>
                        </p>
                        {discount !== 0 && (
                            <p className="line-through text-secondary-300 text-[12px] font-bold">
                                {formatPrice(price)}
                            </p>
                        )}
                    </div>
                    <Button size="sm" asChild className="text-xs px-6 h-9">
                        <Link to={paths.PAYMENT(_id)} onClick={() => {
                            if (!user) {
                                toast.warning("Please login to rent a car")
                                openDialog(ModalEnum.LOGIN)
                            }
                        }}>
                            Rent Now
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    )
}

RentCard.Skeleton = function () {
    return (
        <>
            {/* Desktop Skeleton */}
            <div className="hidden md:block w-full bg-white rounded-[10px] p-4 lg:p-6">
                <div className="flex justify-between">
                    <div>
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <div className="mt-8 lg:mt-12 relative">
                    <Skeleton className="h-32 w-full" />
                    <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
                </div>
                <div className="flex items-center justify-between mt-5 lg:mt-9">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex items-center justify-between mt-3 lg:mt-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                </div>
            </div>

            {/* Mobile Skeleton */}
            <div className="md:hidden w-full bg-white rounded-[10px] p-3 flex gap-3">
                <Skeleton className="w-[120px] h-20 flex-shrink-0 rounded-md" />
                <div className="flex flex-col flex-1 gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2 w-16" />
                    <div className="flex gap-2">
                        <Skeleton className="h-2 w-8" />
                        <Skeleton className="h-2 w-8" />
                        <Skeleton className="h-2 w-8" />
                    </div>
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-14 rounded-md" />
                    </div>
                </div>
            </div>
        </>
    )
}