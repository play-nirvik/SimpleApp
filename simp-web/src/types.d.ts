/* eslint-disable @typescript-eslint/no-explicit-any */
type LoginProps = unknown;
type RegisterProps = unknown;
type HeaderProps = unknown;

type ThemeProps = {
    bgColor?: string;
    textColor?: string;
    theme?: string | null | undefined;
    onUpdate?: () => Promise<any>;
    setTheme?;
};

type UserProps = {
    country: string;
    username: string;
    email: string;
    password: string;
    deviceToken: string;
};

type AuthProps = {
    isLoading?: boolean;
    authState?: {
        token: string | null;
        authenticated: boolean | null;
        username: string | null;
    };
    onRegister?: (userData: UserProps) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => void;
};

type UserInfo = {
    username: string;
    country: string;
    email: string;
    token: string;
};