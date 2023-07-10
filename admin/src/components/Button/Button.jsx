import { Button } from "react-bootstrap";

/**
 * @param {{
 *  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
 *  children: React.ReactNode;
 *  variant: "primary" | "secondary" | "success" | "outline-primary";
 * }} props
 */
const XButton = ({ onClick, children, ...rest }) => {
  return (
    <Button
      {...rest}
      onClick={(e) => {
        onClick(e);
      }}>
      {children}
    </Button>
  );
};

export default XButton;