import { ReviewStatus } from "@/types";

export type CreateReviewRequestPayload = {
    rating: number;
    content: string;
    rentId: string;
}

export type ChangeStatusRequestPayload = {
    id: string;
    status: ReviewStatus.Approved | ReviewStatus.Rejected
}