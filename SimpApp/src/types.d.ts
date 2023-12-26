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
  onLogout?: () => Promise<any>;
};

type ThemeProps = {
  bgColor?: string;
  textColor?: string;
  theme?: string | null | undefined;
  onUpdate?: () => Promise<any>;
  setTheme?;
};

type LoginProps = {
  navigation: any;
};

type RegisterProps = {
  navigation: any;
};

type UserInfo = {
  username: string;
  country: string;
  email: string;
  token: string;
};
