import { useUser } from "../components/UserContext.tsx";

export function useIsAdmin() {
    const { user } = useUser();
    return user?.role === "ADMIN";
}