import { useAuth } from "@/features/auth/context/useAuthStore";
import { globalLoginToggle } from "@/utils/loginBridge";

export const useLogin = () => {
    const { isLoggedIn, user } = useAuth();

    const login = () => {
        if (!isLoggedIn) {
            globalLoginToggle();
            return false;
        }
        return true;
    };

    return { login, isLoggedIn, user };
};
