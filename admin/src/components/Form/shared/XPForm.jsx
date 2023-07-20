import React from 'react'
import { Form } from 'react-bootstrap'



const XPFormContext = React.createContext({})

/**
 * 
 * @param {{
 * children: React.ReactNode,
 * initialState: object,
 * formValidationObj: object
 * }} param0 
 * @returns 
 */
const XPForm = ({children, initialState, formValidationObj}) => {

  return (
    <Form>
      {children}
    </Form>
  )
}

export default XPForm
export const useXPContext = () => React.useContext(XPFormContext)