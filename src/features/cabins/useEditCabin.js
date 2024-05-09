import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editMutate, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => editCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin was edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // reset();
      // setShowEdit(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editMutate, isEditing };
}
