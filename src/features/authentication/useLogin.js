import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["user", data.user]);
      navigate("/dashboard");
    },
    onError: (e) => {
      console.log("ERR", e);
      toast.error("Wrong Email or Password");
    },
  });

  return { login, isPending };
}
