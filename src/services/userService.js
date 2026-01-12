import API from "./API";
export const checkUser = async (formData, showErrorToast) => {
  try {
    const response = await API.post("users", formData);
    // console.log(response);
    return response;
  } catch (error) {
    showErrorToast(error.message);
  }
};
export const generateToken = async (formData, showErrorToast) => {
  try {
    const response = await API.post("users/generate-token", formData);
    return response;
  } catch (error) {
    showErrorToast(error.message);
  }
};
export const userIsLogged = async () => {
  try {
    const response = await API.get("users/verify");
    if (response?.status === 200 && response?.data?.message === "no token") {
      localStorage.removeItem("userDetails");
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getUserData = async (showErrorToast) => {
  try {
    const response = await API.get("users/user");
    return response.data;
  } catch (error) {
    showErrorToast(error.message);
  }
};
export const userLogout = async (toast) => {
  try {
    const response = await API.get("users/log-out");
    return response;
  } catch (error) {
    toast.showErrorToast(error.message);
  }
};

export const updateUser = async (data) => {
  try {
    const response = await API.post("users/update", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendOtp = async (data) => {
  try {
    const response = await API.post("users/send-otp", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const resendOtp = async (data) => {
  try {
    const response = await API.post("users/resend-otp", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const verifyOtp = async (data) => {
  try {
    const response = await API.post("users/verify-otp", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const logout = async () => {
  try {
    const response = await API.get("/users/log-out", {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
