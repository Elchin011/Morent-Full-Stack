import { Review as TReview } from "@/types"
import { Review } from "./Review"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import reviewService from "@/services/review"
import { QUERY_KEYS } from "@/constants/query-keys"
import { useSelector } from "react-redux"
import { selectUserData } from "@/store/features/userSlice"

type Props = {
    reviews: TReview[]
    rentId: string
}

const ReviewsSection = ({ reviews, rentId }: Props) => {
    const [content, setContent] = useState("")
    const [rating, setRating] = useState(0)
    const queryClient = useQueryClient()
    const { user } = useSelector(selectUserData)

    const { mutate } = useMutation({
        mutationFn: reviewService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RENT_DETAIL] })
            setContent("")
            setRating(0)
        }
    })

    function handleSubmit() {
        if (!content || !rating) return
        mutate({ rentId, content, rating })
    }

    return (
        <div className="mx-4 lg:mx-2 md:mx-0 my-6 lg:my-8 bg-white rounded-[10px] p-5 lg:p-6">
            <div className="flex items-center gap-x-3">
                <h3 className="md:text-[20px] text-[16px] font-semibold tracking-[-0.4px] text-secondary">
                    Review
                </h3>
                <div className="md:py-1.5 md:px-5 py-1 px-2 bg-primary rounded text-white font-bold text-[10px] md:text-sm">
                    {reviews.length}
                </div>
            </div>
            <div className="flex flex-col gap-y-4 lg:gap-y-6 mt-6 lg:mt-8">
                {reviews.map((review) => <Review key={review._id} review={review} />)}
            </div>
            {user && (
                <div className="mt-6 flex flex-col gap-y-3">
                    <h4 className="font-semibold">Write a Review</h4>
                    <div className="flex gap-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`md:text-2xl text-xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <Textarea
                    className="w-[300px] md:w-[600px] text-sm md:text-base"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your review..."
                    />
                    <Button className="w-[100px]" onClick={handleSubmit}>Submit</Button>
                </div>
            )}
        </div>
    )
}

export default ReviewsSection