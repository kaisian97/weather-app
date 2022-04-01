import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";

export interface TextFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
  labelProps?: ComponentPropsWithoutRef<"label">;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      outerProps,
      labelProps,
      name,
      type = "text",
      required,
      defaultValue,
      ...props
    },
    _
  ) => {
    const {
      formState: { errors },
      register,
    } = useFormContext();

    return (
      <div {...outerProps}>
        <div className="flex flex-col sm:flex-row items-start">
          <label
            htmlFor={name}
            className="flex pb-1 sm:py-2 items-start sm:items-center font-medium text-md text-gray-600"
            {...labelProps}
          >
            {label}
          </label>
          <div className={`sm:ml-2 w-full flex flex-col items-start`}>
            <input
              id={name}
              className={`bg-white appearance-none rounded-md relative block w-full h-[40px] px-3 py-2 border focus:ring-1 placeholder-gray-500 text-gray-900 focus:outline-none  focus:z-10 sm:text-sm ${
                errors[name]
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-orange-400 focus:border-orange-400"
              }`}
              aria-required={required}
              aria-invalid={!!errors[name]}
              type={type}
              aria-label={label}
              {...props}
              {...register(name, { required })}
            />

            <div className="flex">
              <div />
              {errors[name] && (
                <div
                  role="alert"
                  className="text-red-500 text-sm flex-1 shrink-0"
                >
                  {label} is required
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default TextField;
