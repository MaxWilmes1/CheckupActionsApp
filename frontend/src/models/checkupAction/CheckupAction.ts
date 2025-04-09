import {Status} from "./Status.ts";

export type CheckupAction = {
    id: string,
    title: string,
    subtitle: string,
    art: string,
    adu: string,
    application: string,
    cinum: string,
    pi: string,
    description: string,
    responsibility: string,
    status: Status,
    dateCreated: string,
    dateLastEdit: string
}