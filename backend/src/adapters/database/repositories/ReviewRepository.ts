import { IReviewRepository } from "../../../domain/ports/Review/ReviewRepository";
import { ReviewModel } from "../models/Review";
import { Review } from "../../../domain/entities/Review";

export class ReviewRepository implements IReviewRepository {
  async create(review: Review): Promise<Review> {
    try {
      const reviewModel = new ReviewModel(review);
      await reviewModel.save();
      return reviewModel.toObject() as Review;
    } catch (error: any) {
      throw new Error('Error creating review: ' + error.message);
    }
  }

  async update(_id: string, review: Partial<Review>): Promise<Review> {
    try {
      const updatedReview = await ReviewModel.findByIdAndUpdate(_id, review, { new: true });
      return updatedReview!;
    } catch (error: any) {
      throw new Error('Error updating review: ' + error.message);
    }
  }

  async delete(_id: string): Promise<void> {
    try {
      await ReviewModel.findByIdAndDelete(_id);
    } catch (error: any) {
      throw new Error('Error deleting review: ' + error.message);
    }
  }

  async find(review: Partial<Review>): Promise<Review | Review[] | null> {
    try {
      const foundReview = await ReviewModel.find(review);
      // Se a lista tiver só um elemento, retorna apenas ele
      if (foundReview.length === 1) return foundReview[0];
      // Caso contrário, retorna a lista
      return foundReview;
    } catch (error: any) {
      throw new Error('Error finding review: ' + error.message);
    }
  }
}