import { useState } from 'react'
import Footer from '../Footer'
import RegisterLogic from 'Providers/AuthProvider'
export default function RegisterPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const submitRegister = () => {
    // Add registration logic here (e.g., call to  supabase)
    RegisterLogic({ name, password, email })
  }
  return (
    <div className="flex size-full flex-col items-center justify-center bg-slate-700">
      <h1 className="font-mono text-lg ">RegisterPage</h1>
      <div className="flex flex-col gap-4">
        <div className="m-1 flex flex-col gap-2 p-2">
          <input
            type="text"
            id="user:name"
            placeholder="Enter your name: "
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email: "
            id="user:email"
            type="email"
            aria-label="email"
          ></input>
          <input
            placeholder="Enter your password"
            type="password"
            id="user:password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="password"
          ></input>
        </div>
        <button className="" onClick={() => submitRegister()}>
          Submit
        </button>
      </div>
      <p>Hint BlaBla</p>
      <Footer />
    </div>
  )
}
