import StarFilledImg from "@/assets/icons/star-filled.svg"
import StarOutlinedImg from "@/assets/icons/star-outlined.svg"

type Props = {
    rating: number;
}

export const ReviewStar = ({ rating }: Props) => {
    return (
        <div className="flex gap-x-1.5 items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <img 
                    key={star} 
                    src={star <= Math.round(rating) ? StarFilledImg : StarOutlinedImg} 
                    alt="star"
                    className="w-3 h-3 md:w-4 md:h-4"
                />
            ))}
        </div>
    )
}