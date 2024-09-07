import { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react';
// import { addDoc, collection } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth'; // Firebase Authentication
// import { db } from './firebase'; // Firestore instance

interface Review {
  title: string;
  content: string;
  rating: number;
  userId?: string; // Include user ID in the review structure
}

const StarRating = ({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (rating: number) => void;
}) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          isIconOnly
          variant="light"
          className={`text-2xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => onRate(star)}
        >
          ★
        </Button>
      ))}
    </div>
  );
};

const Reviews = () => {
  const [review, setReview] = useState<Review>({
    title: '',
    content: '',
    rating: 0,
  });

  // const auth = getAuth(); // Firebase Authentication instance
  // const currentUser = auth.currentUser; // Get the current logged-in user

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: number) => {
    setReview((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!currentUser) {
    //   console.error('User not logged in');
    //   return;
    // }

    try {
      const reviewWithUser = {
        ...review,
        // userId: currentUser.uid,
      };

      // await addDoc(collection(db, 'reviews'), reviewWithUser);
      console.log('Review submitted:', reviewWithUser);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Add a Review</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              name="title"
              value={review.title}
              onChange={handleInputChange}
              placeholder="Enter review title"
              required
            />
            <Textarea
              label="Review"
              name="content"
              value={review.content}
              onChange={handleInputChange}
              placeholder="Write your review here"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <StarRating rating={review.rating} onRate={handleRatingChange} />
            </div>
            <Button type="submit" color="primary">
              Submit Review
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Reviews;
