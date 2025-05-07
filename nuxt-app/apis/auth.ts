export const getTestData = () => {
  return useShuttlerTwAPI.get<{
    message: string;
    success: string;
  }>("/getTestData");
};

export const testLogin = (loginData: { email: string; password: string }) => {
  return useShuttlerTwAPI.post("/testLogin", loginData, { watch: false });
};

export const emailLogin = (loginData: { email: string; password: string }) => {
  return useShuttlerTwAPI.post<{
    data: {
      token: string;
      user: {
        id: string;
        email: string;
        name: string;
      };
    };
    message: string;
  }>("/auth/login", loginData, { watch: false });
};

export const emailSignUp = (signUpData: {
  email: string;
  password: string;
  name: string;
}) => {
  return useShuttlerTwAPI.post("/auth/signup", signUpData, { watch: false });
};
