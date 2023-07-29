
export const INTEGER_REGEX = /^[0-9]*$/
export const FLOAT_REGEX = /^[0-9]*\.?[0-9]*$/
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
export const PHONE_NO_REGEX = /^[0-9]{10}$/
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
export const NO_SPECIAL_CHARS_REGEX = /^[a-zA-Z][a-zA-Z0-9 ]*(?:-[a-zA-Z0-9 ]+)*$/
export const BINARY_REGEX = /^([01])$/


export const REQUEST_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
}

export const ROUTE_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  SUSPENDED: 2,
}