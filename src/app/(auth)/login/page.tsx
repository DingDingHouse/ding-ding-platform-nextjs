'use client'
import { jwtDecode } from "jwt-decode"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import Notification from "@/components/Notification"
import { login } from "@/utils/action"
import Input from "@/components/Input"
import Name from "@/components/svg/Input/Name"
import Password from "@/components/svg/Input/Password"
import Button from "@/components/Button"

export default function UserLogin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const validateForm = () => {
    if (username === "" || password === "") {
      toast.custom((t) => (
        <Notification
          visible={t.visible}
          message="Username and password are required"
          styleTop={'w-full h-screen -rotate-90 sm:rotate-0'}
        />
      ))
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      toast.custom((t) => (
        <Notification
          visible={t.visible}
          message="Logging In..."
          styleTop={'w-full -rotate-90 sm:rotate-0 h-screen'}
        />
      ))
      const response: any = await login({ username, password })
      console.log(response,"response")
      if (response) {
        if (response?.isUnderMaintenance) {
          toast.remove()
          return toast.custom((t) => (
            <Notification
              className="rotate-0"
              styleTop={'w-full h-screen'}
              visible={t.visible}
              message={response?.message}
            />
          ))
        }
        const token = response?.token
        if (token) {
          const decodedToken: any = jwtDecode(token)

          if (decodedToken.role === "player") {
            toast.remove()
            toast.custom((t) => (
              <Notification
                className="rotate-0"
                styleTop={'w-full h-screen !-rotate-90 sm:rotate-0'}
                visible={t.visible}
                message="Login Successful"
              />
            ))
            Cookies.set("token", token);
            const randomNumber: number = Math.floor(Math.random() * 10) + 1
            Cookies.set("index", randomNumber.toString())
            router.push("/")
          } else {
            toast.remove()
            toast.custom((t) => (
              <Notification
                className="rotate-0"
                styleTop={'w-full h-screen'}
                visible={t.visible}
                message="Access Denied: Not a player"
              />
            ))
          }
        } else {
          toast.remove()
          toast.custom((t) => (
            <Notification
              styleTop={'w-full -rotate-90 sm:rotate-0 h-screen'}
              visible={t.visible}
              message={response?.error}
            />
          ))
        }
      } else {
        toast.remove()
        toast.custom((t) => (
          <Notification
            styleTop={'w-full h-screen'}
            visible={t.visible}
            message={response.message || response.error || "Login failed"}
          />
        ))
      }
    } catch (error) {
      toast.remove()
      toast.custom((t) => (
        <Notification
          visible={t.visible}
          styleTop={'w-full h-screen'}
          message="An error occurred! Please try again"
        />
      ))
    }
  }

  return (
    <div className="relative !-rotate-90 sm:!rotate-0 min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/login/bg-login.png')] bg-cover bg-center" />

      <div className="relative flex min-h-screen w-full items-center">
        
        {/* Content Div */}
        <div className="flex-grow flex items-center justify-center md:items-start md:justify-start p-4 sm:p-8 w-full md:w-3/5 relative z-10">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 w-full max-w-sm mx-auto bg-black bg-opacity-50 p-4 rounded-lg md:bg-transparent md:p-0">
              <Input
                name="name"
                onChange={handleUsernameChange}
                type="text"
                placeholder="Enter Name"
                icon={<Name className="h-[85%] w-[85%]" />}
              />

              <Input
                name="password"
                onChange={handlePasswordChange}
                type="password"
                placeholder="Enter Password"
                icon={<Password className="h-[85%] w-[85%]" />}
              />
              <div className="flex justify-center ">
              <button
                type="submit"
                className="mt-2vw  z-[100]"
              >
                <Button className="uppercase" text="Login" />
              </button>
              </div>
              
            </form>
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full md:relative md:flex-shrink-0 md:h-screen md:w-2/5">
          <div className="relative h-full w-full">
            <Image
              src="/login/character1.png"
              alt="Lady image"
              fill
              priority
              className="opacity-90  md:opacity-100 object-cover sm:object-contain object-center"
            />
          </div>
        </div>

      </div>
    </div>
  )
}