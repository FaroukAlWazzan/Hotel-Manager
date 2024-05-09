import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isPending: isSigningup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => toast.success("User was registered successfully"),
    onError: () => toast.error("There was a problem registering this user"),
  });

  return { signup, isSigningup };
}
