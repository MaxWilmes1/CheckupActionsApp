import {AppUserRole} from "./AppUserRole.tsx";

export type AppUser = {
    id: string,
    role: AppUserRole,
    username: string,
    avatarUrl: string,
    createdAt: string,
}