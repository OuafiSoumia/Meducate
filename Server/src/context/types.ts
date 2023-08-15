export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  _id: string
  title: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  role: string
  highestQualification: string
  profile?: string
  speciality?: string
  yearsOfExperience?: string
  sector?: string
  workExperience?: string
  institution?: string
  avatar?: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
