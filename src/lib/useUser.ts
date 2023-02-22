import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

export default function useUser() {
  const { isLoading, data, isError } = useQuery(["me"], getMe, {
    retry: false,
  });
  return {
    userLoading: isLoading,
    isLoggedIn: !isError,
    user: data,
  };
}
