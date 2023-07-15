import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const XPButton = ({ variant = "primary",size="md", onClick, children, ...rest }) => (
  <Button variant={variant} size={size} onClick={onClick} {...rest}>
    {children}
  </Button>
)

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="outline-danger" onClick={() => navigate(-1)}>
      Back
    </Button>
  );
};

const ButtonLink = ({ to, variant = "primary", children, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Button variant={variant} onClick={() => navigate(to)} {...rest}>
      {children}
    </Button>
  );
};

const ButtonDownload = ({
  href,
  children,
  variant = "outline-dark",
  ...rest
}) => {
  return (
    <Button variant={variant} href={href} download {...rest}>
      {children}
    </Button>
  );
};




export { BackButton, ButtonLink, ButtonDownload, XPButton as Button };
