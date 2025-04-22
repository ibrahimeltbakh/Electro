import api from "@/lib/axios";
import toast from "react-hot-toast";

const getToken = () => localStorage.getItem('token');
export const AddReviews = async ({ productId, rate, comment }) => {
    const token = getToken();

    if (!token) {
        toast.error("You must be logged in to add a review.");
        return;
    }

    const response = await api.post(
        `/products/${productId}/reviews`,
        {
            comment,
            rate: parseInt(rate)
        },
        {
            headers: {
                token: getToken()
            }
        }
    );

    return response.data;
};

export const deleteReview = async (reviewId) => {
    console.log(reviewId)
    const token = getToken();

    if (!token) {
        toast.error("You must be logged in to add a review.");
        return;
    }
    const response = await api.delete(`/reviews/${reviewId}`, {
        headers: { token }
    });

    return response.data;
};



