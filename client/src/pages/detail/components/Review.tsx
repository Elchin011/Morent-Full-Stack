import { ReviewStar } from "@/components/shared/ReviewStar"
import { formatDate } from "@/lib/utils";
import { Review as TReview } from "@/types";
import { User2Icon } from "lucide-react"


type Props = {
    review: TReview;
}

export const Review = ({ review }: Props) => {
    const { author, createdAt, rating, content } = review

    const firstName = author.name
    const lastName = author.surname

    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                    <div className="bg-primary rounded-full md:h-14 md:w-14 h-8 w-8 flex-shrink-0 p-2 md:p-3">
                        <User2Icon className="w-full h-full text-white" />
                    </div>
                    <h6 className="text-secondary-500 text-[14px] md:text-xl font-bold leading-[150%] tracking-[-0.6px]">
                        {firstName} {lastName}
                    </h6>
                </div>
                <div className="flex-shrink-0 text-right">
                    <p className="text-secondary-300 text-[11px] md:text-sm font-medium leading-[150%] tracking-[-0.28px] mb-1">
                        {formatDate(createdAt, "DD MMM yyyy")}
                    </p>
                    <ReviewStar rating={rating} />
                </div>
            </div>
            <p className="text-[12px] md:text-sm font-normal leading-[180%] md:leading-[200%] tracking-[-0.28px] text-secondary-300 px-2">
                {content}.
            </p>
        </div>
    )
}
