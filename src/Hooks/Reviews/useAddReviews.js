import { useMutation } from "@tanstack/react-query";
import AddReviews from "./reviewsFn";

const useAddReviews = () => {
    const { mutate, isLoading, isError, isSuccess } = useMutation(AddReviews);
    return { mutate, isLoading, isError, isSuccess };
};

export default useAddReviews;
