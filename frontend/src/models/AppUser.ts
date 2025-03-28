export type AppUser = {
    id: string,
    role: "USER" | "ADMIN",
    username: string,
    avatarUrl: string,
    createdAt: string,
}