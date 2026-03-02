import { Request, Response } from "express"
import Review from "../mongoose/schemas/review"
import Reservation from "../mongoose/schemas/reservation";
import Rent from "../mongoose/schemas/rent";

const getAll = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find().populate("author").populate("rent");
        res.status(200).json({
            message: "Reviews fetched successfully",
            items: reviews
        })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { rentId, content, rating } = req.matchedData;

        const rent = await Rent.findById(rentId)
        if (!rent) {
            res.status(404).json({ message: "Rent not found" })
            return
        }

        const review = await Review.create({
            author: user!._id,
            rent: rentId,
            content,
            rating
        });

        rent.reviews.push(review._id)
        await rent.save()

        res.status(201).json({
            message: "Review created successfully",
            review
        })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
};




const getByRentId = async (req: Request, res: Response) => {
    try {
        const { rentId } = req.params;
        const reviews = await Review.find({
            rent: rentId,
        }).populate("author")

        res.status(200).json({
            message: "Review fetched successfully",
            items: reviews
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            res.status(404).json({ message: "Review not found" })
            return
        }
        res.status(200).json({ message: "Review deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export default { getAll, getByRentId, create, remove }