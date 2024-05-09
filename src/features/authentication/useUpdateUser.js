import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Account user was successfully updated");
      queryClient.setQueryData(["user", data.user]);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (e) => toast.error(e.message),
  });

  return { updateUser, isPending };
}
