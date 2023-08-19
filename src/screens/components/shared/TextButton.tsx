import { Button } from "./SharedStyle";

interface IProps {
  children: React.ReactNode;
  accent?: boolean;
}

function TextButton({ children, accent }: IProps) {
  return <Button accent={accent}>{children}</Button>;
}

export default TextButton;
