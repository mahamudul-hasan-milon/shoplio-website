import PropTypes from "prop-types";

export default function Card({
  children,
  className = "",
  hover = true,
  padding = "medium",
  ...props
}) {
  const paddingStyles = {
    none: "p-0",
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  const hoverStyles = hover
    ? "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    : "";

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-2xl 
        shadow-lg 
        overflow-hidden
        ${paddingStyles[padding] || paddingStyles.medium}
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  padding: PropTypes.oneOf(["none", "small", "medium", "large"]),
};

export function CardHeader({ children, className = "" }) {
  return <div className={`mb-6 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div
      className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

CardHeader.propTypes =
  CardBody.propTypes =
  CardFooter.propTypes =
    {
      children: PropTypes.node.isRequired,
      className: PropTypes.string,
    };
