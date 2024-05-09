import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createMutate, isPending: isCreating } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      toast.success("The new cabin was created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // reset();
    },
    onError: (err) => {
      // toast.error("couldn't create the cabin");
      toast.error(err.message, "couldn't do shit");
    },
  });

  return { createMutate, isCreating };
}
