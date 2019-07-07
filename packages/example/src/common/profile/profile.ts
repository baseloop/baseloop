export interface Profile {
  annualIncome: number
  birthday: Date
  emails: Email[]
  gender: Gender | null
  name: string
  profession: string
}

export interface Email {
  address: string
  type: EmailType
}

export enum EmailType {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS'
}

export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE'
}
