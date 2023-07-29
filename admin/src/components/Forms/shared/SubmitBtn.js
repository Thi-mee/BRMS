import {memo} from "react";
import {Button} from "react-bootstrap";

const SubmitBtn = ({isFormValid, text, className}) => {
    return (
        <Button type={"submit"} size={"md"} disabled={isFormValid} variant={"primary"} className={"float-end mb-3 mt-3 " + className}>
            {text}
        </Button>
    )
}

export default memo(SubmitBtn)
