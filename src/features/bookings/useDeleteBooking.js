import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteB, isPending } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("booking deleted successfully");

      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (e) => toast.error(e.message),
  });

  return { deleteB, isPending };
}
