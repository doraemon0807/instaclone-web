import { Button } from "./SharedStyle";

interface IProps {
  children: React.ReactNode;
}

function TextButton({ children }: IProps) {
  return <Button>{children}</Button>;
}

export default TextButton;
