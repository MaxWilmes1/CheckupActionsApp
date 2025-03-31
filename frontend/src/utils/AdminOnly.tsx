import { ReactNode } from "react";
import { useUser } from "../utils/UserContext.tsx";

type Props = {
    children: ReactNode;
};

export default function AdminOnly({ children }: Props) {
    const { user } = useUser();

    if (user?.role !== "ADMIN") return null;
    return <>{children}</>;
}
