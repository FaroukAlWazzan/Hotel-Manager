import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Successfully checked out booking #${data.id}`);
      queryClient.invalidateQueries({ active: true });
      // navigate("/");
    },
    onError: () => {
      toast.error("Error happened when updating that booking");
    },
  });
  return { checkout, isPending };
}
