import { useState } from "react";
import { useNavigate} from "react-router-dom"
import axios from "axios"

function Login() {
  const navigate = useNavigate()

    const [formData, setFormData] = useState({
    username: '',
    password: '',
    confrimpassword: ''
  })

  const [error, setError] = useState('')

  const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData({...formData, [name]: value});
 };
async function handleSubmit (e){
  e.preventDefault()
  setError("")
     try{
           let response

             response = await axios.post("http://localhost:3000/login", formData)
             console.log(response)
             const { token } = response.data;

                  // Decode token (optional safety check)
            const decoded = JSON.parse(atob(token.split(".")[1]));
          if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
              setError("Token expired");
              return;
               }

          // Success
        localStorage.setItem("token", token);
     }
   catch(error){
           const message =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    setError(message);
    console.error(error);
    }
}
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-[#0f172a] p-8 flex flex-col justify-center gap-4 md:p-12">
        <h1
        className="text-2xl font-semibold text-white font-serif"
        >
          Connect with anyone, anywhere
        </h1>
        <p
        className="text-[#9FB3C8]"
        >
          Simple, fast messaging. No noise, no distractions. Just conversations that matter.

        </p>
      </div>

      <div className="bg-[#1e293b] flex flex-col gap-4  justify-center p-6">
        <div
        className="mx-auto w-full max-w-lg space-y-4"
        >
           <h1
           className="text-2xl font-semibold text-white font-serif"
        >
          Welcome Back
        </h1>
         <p
        className="text-[#9FB3C8]"
        >
        Sign in to your account

        </p>
        <form
        className="space-y-2 flex flex-col" onSubmit={handleSubmit}
        >
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              type="text"
              placeholder="Username"   
            className="w-full rounded-xl border border-[#334155]
           bg-[#162032] px-5 py-3.5
           text-[#f1f5f9] placeholder:text-[#94a3b8]
           outline-none transition-all duration-200
           focus:border-[#60a5fa] focus:ring-2
           focus:ring-[#60a5fa]/20"
            />
              <input
              id="
              password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
               className="w-full rounded-xl border border-[#334155]
           bg-[#162032] px-5 py-3.5
           text-[#f1f5f9] placeholder:text-[#94a3b8]
           outline-none transition-all duration-200
           focus:border-[#60a5fa] focus:ring-2
           focus:ring-[#60a5fa]/20 mb-5"
            />
                <button
            type="submit"
           className="w-full rounded-xl bg-indigo-500 px-5 py-3.5
  font-semibold text-white shadow-md shadow-indigo-500/20
  transition-all duration-200
  hover:bg-indigo-400
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-indigo-300 focus-visible:ring-offset-2
  focus-visible:ring-offset-[#1e293b]
  active:scale-[0.99] font-serif cursor-pointer"
          >
          
            Sign In
         
           
          </button>
           {error && (
                    <p className="text-red-400 text-sm mb-4 bg-red-400/10 px-3 py-2 rounded-lg">
                        {error}
                    </p>
                )}
        </form>

        </div>
       
      </div>
    </div>
  );
}

export default Login;