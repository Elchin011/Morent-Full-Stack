import { ReviewStar } from "@/components/shared/ReviewStar"
import HeartFilldeRed from "@/assets/icons/heart-filled-red.svg"
import HeartOutlined from "@/assets/icons/heart-outlined.svg"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Rent } from "@/types"
import { Link } from "react-router-dom"
import { paths } from "@/constants/paths"
import { formatPrice } from "@/lib/utils"
import { useSelector } from "react-redux"
import { selectUserData } from "@/store/features/userSlice"
import { toast } from "sonner"
import { ModalEnum, useDialog } from "@/hooks/useDialog"


type Props = {
    rent: Rent
}


export const InformationSection = ({ rent }: Props) => {
    const [isliked, setisLiked] = useState(false)
    const { _id, name, description, fuel, gearBox, capacity, category, price, discount, reviews } = rent;
    const { user } = useSelector(selectUserData)
    const { openDialog } = useDialog();
    console.log(reviews.length);


    const rating = Math.round(reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length)
    return (
        <div className="bg-white rounded-[10px] mx-4 md:mx-0 p-4 lg:p-6 relative">
            <h1 className="text-secondary-500 text-2xl lg:text-[32px] !leading-[150%] tracking-[-0.96px] font-bold">{name}</h1>
            <div className="mt-2  flex items-center gap-x-2">
                <ReviewStar rating={rating} />
                <p className="text-secondary text-sm font-medium tracking-[-0.28px]">{reviews.length} Reviewer</p>
                <button className="md:h-fit absolute right-6 top-6 w-4 h-4" onClick={() => setisLiked(!isliked)}><img src={isliked ? HeartFilldeRed : HeartOutlined} alt="heart" /></button>
            </div>
            <p className="min-h=[160px] my-5 lg:my-8 text-lg lg:text-xl !leading-[200%] tracking-[-0.4px] text-secondary">{description}</p>
            <div className="flex flex-wrap  items-center justify-between md:gap-4">
                <div className="w-[150px] md:w-[200px] flex justify-between">
                    <p className="text-secondary-300 text-[12px] lg:text-xl md:text-[20px] font-normal leading-[150%] tracking-[-0.4px]">Type Car</p>
                    <p className="text-secondary text-[12px] lg:text-xl md:text-[20px] font-semibold leading-[150%] tracking-[-0.4px]">{category.name}</p>
                </div>
                <div className=" w-[150px] md:w-[200px] flex justify-between">
                    <p className="text-secondary-300 text-[12px] lg:text-xl md:text-[20px] font-normal leading-[150%] tracking-[-0.4px]">Capacity</p>
                    <p className="text-secondary text-[12px] lg:text-xl md:text-[20px] font-semibold leading-[150%] tracking-[-0.4px]">{capacity} People</p>
                </div>
                <div className="w-[150px] md:w-[200px] flex justify-between">
                    <p className="text-secondary-300 text-[12px] lg:text-xl md:text-[20px] font-normal leading-[150%] tracking-[-0.4px]">Streering</p>
                    <p className="text-secondary text-[12px] lg:text-xl md:text-[20px] font-semibold leading-[150%] tracking-[-0.4px]">{gearBox}</p>
                </div>
                <div className="w-[150px] md:w-[200px] flex justify-between">
                    <p className="text-secondary-300 text-[12px] lg:text-xl md:text-[20px] font-normal leading-[150%] tracking-[-0.4px]">Gasoline</p>
                    <p className="text-secondary text-[12px] lg:text-xl md:text-[20px] font-semibold leading-[150%] tracking-[-0.4px]">{fuel}L</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-12 lg:mt-16">
                <div>
                    <p className="text-secondary-500 text-[20px] md:text-[28px] font-bold">{formatPrice(price - discount)}/ <span className="text-[12px] md:text-base text-secondary-300">days</span></p>
                    <p className="line-through text-secondary-300 text-[12px] md:text-base font-bold -mt-0">{formatPrice(price)}</p>
                </div>

                <Button
                className="text-base md:text-base py-7 px-9"
                 asChild>
                    <Link to={paths.PAYMENT(_id)} onClick={
                        () => {
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
    )
}