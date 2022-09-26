import { Label } from "./Label";

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <Label className="text-red-600 block max-w-fit" role="alert">
      {message}
    </Label>
  );
}
