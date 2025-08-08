import { Pettytype } from "./pettytype"
import { Owner } from "./owner"

export interface Pet {

    id: number,
    name: string,
    birthDate: Date,
    typeName: Pettytype,
    ownerId: Owner
}
