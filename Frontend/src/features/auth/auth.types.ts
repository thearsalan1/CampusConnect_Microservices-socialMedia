export interface LoginPayLoad {
  collegeId: string;
  password: string;
}

export interface AuthUser {
  userId: string;
  name: string;
  branch: string;
  role: string;
  collegeId: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}
