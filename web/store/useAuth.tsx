import React, {
    useContext, createContext
} from 'react';
import { useRouter } from "next/router";
import { api } from '../utils/api';


// context content types
interface IAuth {
    tokens: { accessToken: string, refreshToken: string }
    user: any | null
    signUp: (username: string, email: string, password: string, confirmPassword: string) => Promise<any>
    signIn: (data: SigninProps) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean,
    setError: React.Dispatch<React.SetStateAction<string>>
    setTokens: React.Dispatch<React.SetStateAction<any>>
}

interface SigninProps {
    password: string
    email?: string
    username?: string
    redirectTo?: string
}

// context props
interface Props {
    children: React.ReactNode
}

// creating auth context
const AuthContext = createContext<IAuth>({
    tokens: { accessToken: "", refreshToken: "" },
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
    loading: false,
    setError: () => { },
    setTokens: () => { }
});


// creating auth provider
export const AuthProvider = ({ children }: Props) => {
    const router = useRouter();

    // states
    const [user, setUser] = React.useState<any | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [tokens, setTokens] = React.useState<any>({ accessToken: "", refreshToken: "" })

    // use effect which will run for each time a user accesses our application.
    React.useEffect(() => {

        /* we are going to use localStorage for user storage
            but we will leter use cookies when integrated with backend.
        */
        setLoading(true);
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        } else {
            if (router.pathname !== '/')
                router.push("/")
        }
        setLoading(false);
        // console.log("pathname", router.pathname);
    }, [router.pathname]);

    /*
        sign up function
        ----------------
        this function will be used to sign up a user.
    */
    const signUp = async (username: string, email: string, password: string, confirmPassword: string): Promise<{ error?: string, success?: boolean }> => {
        router.push('/feed')
        try {
            setLoading(true)
            const res = await api.post("/auth/signup", {
                username,
                email,
                password,
                confirmPassword
            })
            console.log(res);
            if (res.data.error)
                return { error: res.data.message }
            else
                setTokens({ ...res.data.tokens })
                setLoading(false)
                router.push('/feed')

        } catch (error) {
            setLoading(false)
            setError(error.message);
        }
    };


    const signIn = async (data: SigninProps) => {
        setLoading(true)
        await api.post("/auth/signup", {
            username: data.username,
            password: data.password,
        }).then(({ data }) => {
            if (data.status === 404) {
                setError("Invalid Credentials!")
            }
            else if (data.user) {
                typeof document.cookie !== "undefined" ? document.cookie = `access-token=${data.token}; path=/;` : null;
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                router.push('/quizzer');
            }
        }).catch(err => {
            setError(err.message);
            console.log(err);
        });
    };
    // logout function
    const logout = async () => {
        try {
            setUser(null);
            localStorage.removeItem("user");
            setLoading(false);
            // remove access-token from  cookie
            typeof document.cookie !== "undefined" ? document.cookie = `access-token =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;` : null;

            router.push("/feed")

        } catch (error) {
            setError(error.message);
        }
    };

    // actual auth context
    return (
        <AuthContext.Provider value={{ tokens, user, signUp, signIn, logout, error, setError, loading, setTokens }}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook to use auth context
export const useAuth = () => {
    return useContext(AuthContext);
}