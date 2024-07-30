import { LoginDto } from "../interfaces/auth.interface";

const API = 'http://localhost:3000/api/auth';

export const login = async (loginDto: LoginDto) => {
    const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDto),
    });
    return response.json();
}