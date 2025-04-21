import api from "@/lib/axios";
const AddReviews = async ({ productId, rate, comment }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('يجب تسجيل الدخول أولاً');
    }

    const response = await api.post(
        `/products/${productId}/reviews`,
        {
            comment,
            rate: parseInt(rate)
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export default AddReviews;

