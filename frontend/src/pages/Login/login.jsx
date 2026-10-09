import { useState } from "react";
function Login() {
    const [formData, setFormData] = useState({
    username: '',
    password: '',
    confrimpassword: ''
  })

  const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData({...formData, [name]: value});
 };
const handleSubmit = (e)=>{
  e.preventDefault()
  console.log(formData)
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
        </form>

        </div>
       
      </div>
    </div>
  );
}

export default Login;