import PropTypes from "prop-types";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

const inputVariants = cva(
  "w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:border-blue-500 focus:ring-blue-500/30",
        error: "border-red-500 focus:border-red-500 focus:ring-red-500/30",
        success:
          "border-green-500 focus:border-green-500 focus:ring-green-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Input = forwardRef(
  (
    {
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      variant,
      className,
      ...props
    },
    ref,
  ) => {
    const inputVariant = error ? "error" : success ? "success" : variant;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={inputVariants({
              variant: inputVariant,
              className: [
                leftIcon ? "pl-10" : "",
                rightIcon ? "pr-10" : "",
                className,
              ].join(" "),
            })}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={`mt-1 text-sm ${
              error ? "text-red-600" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.bool,
  helperText: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  variant: PropTypes.oneOf(["default", "error", "success"]),
  className: PropTypes.string,
};

export default Input;
