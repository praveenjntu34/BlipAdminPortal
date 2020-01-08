
  export class POC {
    personDto: PersonDto
    relInstitutionId: number
    secondaryPOCEmail: string
    secondaryPOCName: string
    secondaryPOCPhoneNumber: string

    constructor(personDto: PersonDto,relInstitutionId: number, secondaryPOCEmail: string,secondaryPOCName: string,secondaryPOCPhoneNumber: string ) {
        this.personDto = personDto;
        this.relInstitutionId = relInstitutionId
        this.secondaryPOCEmail = secondaryPOCEmail
        this.secondaryPOCName = secondaryPOCName
        this.secondaryPOCPhoneNumber = secondaryPOCPhoneNumber
    }
  }

  export class PersonDto {
      firstName: string 
      lastName: string
      personTypeId: number
      gender: string

      constructor(firstName:string, lastName: string, personTypeId: number, gender: string){
        this.firstName = firstName
        this.lastName = lastName
        this.personTypeId = personTypeId
        this.gender = gender
      }

  }