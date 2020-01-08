export class Institution {
    institutionName: string = ''
    email: string = ''
    website: string = ''
    institutionTypeId: InstitutionType
    address1: string = ''
    address2: string = ''
    cityId: number
    stateId: number
    countryId: number
    remarks: string = ''
    status: boolean
    pictureId: number
}

enum InstitutionType {
    College = 1,
    School = 2
}