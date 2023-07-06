import { Alert } from "react-bootstrap"

const AlertComp = ({text, variant}) => {
    return(
        <Alert className="pb-1 mt-4 w-50" variant={variant}>
            {text}
        </Alert>
    )
}

export default AlertComp;