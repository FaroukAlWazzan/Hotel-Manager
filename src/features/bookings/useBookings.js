import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const val = searchParams.get("status");
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  console.log(sortByRaw);

  // Filtering on the server side
  const filterSpec =
    !val || val === "all"
      ? null
      : { field: "status", value: val, method: "eq" };
  // const filterSpec = { field: "totalPrice", value: 7000, method: "gte" };

  // Sorting on the server side
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // query
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filterSpec, sortBy, page],
    // we put filterSpec in {} because we only want to pass 1 argument. later we'll have more options to pass
    queryFn: () => getAllBookings({ filterSpec, sortBy, page }),
  });

  // pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterSpec, sortBy, page + 1],
      queryFn: () => getAllBookings({ filterSpec, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterSpec, sortBy, page - 1],
      queryFn: () => getAllBookings({ filterSpec, sortBy, page: page - 1 }),
    });

  return { bookings, count, isLoading, error };
}
