import { forwardRef, PropsWithoutRef, ReactNode } from "react";
import { SpinnerIcon } from "../icons";

export interface ButtonProps
  extends PropsWithoutRef<JSX.IntrinsicElements["button"]> {
  variant?: "primary" | "secondary" | "ghost";
  shape?: "normal" | "rounded";
  isLoading?: boolean;
  icon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      isLoading,
      variant = "primary",
      shape = "normal",
      disabled,
      icon,
      ...restProps
    },
    ref
  ) => {
    const variantClassName = {
      primary:
        "bg-orange-400 text-white outline-orange-600 hover:bg-orange-500",
      secondary:
        "bg-orange-100 text-orange-400 outline-orange-400 hover:bg-orange-200 disabled:bg-orange-100",
      ghost:
        "bg-white text-orange-400 border border-orange-400 outline-orange-400 hover:bg-orange-50",
    };

    const shapeClassName = {
      normal: "rounded-lg py-2 px-4",
      rounded: "rounded-full p-2",
    };

    const isBtnDisabled = isLoading || disabled;

    const renderContent = () => {
      if (isLoading && !children)
        return (
          <SpinnerIcon stroke={variant === "secondary" ? "lightgray" : ""} />
        );
      if (isLoading)
        return (
          <>
            <SpinnerIcon className="mr-2" /> {children}
          </>
        );
      return (
        <>
          {icon} {children}
        </>
      );
    };
    return (
      <button
        className={`rounded-lg transition ${shapeClassName[shape]}  ${
          variantClassName[variant]
        } ${isBtnDisabled ? "brightness-95" : ""}`}
        disabled={isBtnDisabled}
        aria-disabled={isBtnDisabled}
        {...restProps}
      >
        <span className="flex items-center">{renderContent()}</span>
      </button>
    );
  }
);

export default Button;
