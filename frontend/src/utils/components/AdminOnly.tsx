import { ReactNode } from "react";
import { useUser } from "./UserContext.tsx";

type Props = {
    children: ReactNode;
};

export default function AdminOnly({ children }: Readonly<Props>) {
    const { user } = useUser();

    if (user?.role !== "ADMIN") return null;
    return <>{children}</>;
}
