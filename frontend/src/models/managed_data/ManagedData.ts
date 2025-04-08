import {ManagedDataType} from "./ManagedDataType.ts";

export type ManagedData = {
    id: string,
    info: string,
    type: ManagedDataType,
    isNew: boolean
}