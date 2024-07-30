import { useState } from "react";
import { login } from "../api/authService";


function LoginPage() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.currentTarget.name]: e.currentTarget.value})
    }

    const handleSubmit =  async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await login(user)
        if (data.token){
            localStorage.setItem('token', data.token)
            window.location.href = '/'
        } else {
            alert('Usuario o contraseña incorrectos')
        }
    }

  return (
    <div className="bg-zinc-900 h-screen text-white flex flex-col items-center justify-start pt-10">
        <div className="bg-gray-950 p-8 w-1/3 rounded-md shadow-lg flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-5">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white   text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        </div>
    </div>
  );
}

export default LoginPage