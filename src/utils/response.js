export const responseWithError = (msg, code) => {
  return {
    errors: {
      status_code: code,
      message: msg
    }
  };
};

export const responseWithData = collection => {
  return {
    data: collection
  };
};

export const responseValidateError = (msg, code, errors) => {
  return {
    errors: {
      status_code: code,
      message: msg,
      errors: errors
    }
  };
};
