// import supabase from "../../services/supabase";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

// export async function useUser() {
//   const { data: user } = await supabase.auth.getUser();

//   return user;
// }

export function useUser() {
  const {
    data: user,
    isLoading,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  // console.log(user);

  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
    fetchStatus,
  };
}
