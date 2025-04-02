import { ReactNode } from "react";
import { useUser } from "./UserContext.tsx";

type Props = {
    children: ReactNode;
};

export default function HasRole({ children }: Readonly<Props>) {
    const { user } = useUser();

    if (!user) return null;
    return <>{children}</>;
}
