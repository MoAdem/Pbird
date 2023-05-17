import Http from './Http';

const loginService = async (user) => {
  const response = await Http.post('/users/auth/login', { ...user });
  return response.data;
};

const registerService = async (user) => {
  const response = await Http.post('/users/auth/register', { ...user });
  return response.data;
};

const validateResetPasswordService = async (user) => {
  const response = await Http.put('/users/auth/reset_password', { ...user });
  return response.data;
};

const sendOTPService = async ({ user, token }) => {
  const config = {
    headers: {
      Authorization: `token ${token}`
    }
  };
  const response = await Http.put('/user/send_otp/', { ...user }, config);
  return response.data;
};

const validateOTPService = async ({ number, token }) => {
  const config = {
    headers: {
      Authorization: `token ${token}`
    }
  };
  const response = await Http.post('/user/validate_otp/', { otp: number }, config);
  return response.data;
};

const setPasswordService = async ({ pass, token }) => {
  const config = {
    headers: {
      Authorization: `token ${token}`
    }
  };
  const response = await Http.put('/user/define_password/', { ...pass }, config);
  return response.data;
};

const getUserByTokenService = async () => {
  const response = await Http.get('/users/auth/user');
  return response.data;
};

const logoutService = async () => {
  const response = await Http.post('/users/auth/logout');
  return response.data;
};

const resetPasswordService = async (payloadData) => {
  const response = await Http.put('/users/auth/reset_password', payloadData);
  return response.data;
};

export {
  loginService,
  registerService,
  validateResetPasswordService,
  sendOTPService,
  validateOTPService,
  setPasswordService,
  getUserByTokenService,
  logoutService,
  resetPasswordService
};
