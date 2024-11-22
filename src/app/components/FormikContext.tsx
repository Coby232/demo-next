/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode } from 'react';

interface FormikContextType<T> {
  values: T;
  errors: Partial<T>;
  touched: Partial<T>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const FormikContext = createContext<FormikContextType<any> | undefined>(undefined);

FormikContext.displayName = 'FormikContext';

export default FormikContext;
