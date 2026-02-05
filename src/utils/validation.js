// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Form validation
export const validateForm = (fields, values) => {
  const errors = {};

  fields.forEach((field) => {
    const value = values[field.name];

    // Required validation
    if (field.required && !value?.trim()) {
      errors[field.name] = `${field.label} is required`;
      return;
    }

    // Email validation
    if (field.type === "email" && value) {
      if (!isValidEmail(value)) {
        errors[field.name] = "Please enter a valid email address";
      }
    }

    // Min length validation
    if (field.minLength && value && value.length < field.minLength) {
      errors[field.name] =
        `${field.label} must be at least ${field.minLength} characters`;
    }

    // Max length validation
    if (field.maxLength && value && value.length > field.maxLength) {
      errors[field.name] =
        `${field.label} cannot exceed ${field.maxLength} characters`;
    }

    // Pattern validation
    if (field.pattern && value) {
      const regex = new RegExp(field.pattern);
      if (!regex.test(value)) {
        errors[field.name] = field.patternMessage || "Invalid format";
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
