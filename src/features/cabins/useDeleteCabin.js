import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteC, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    // this line could be the following
    // mutationFn: (id) => deleteCabin(id)
    onSuccess: () => {
      toast.success("deleted cabin successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error("couldn't delete the cabin");
    },
  });

  return { deleteC, isDeleting };
}
