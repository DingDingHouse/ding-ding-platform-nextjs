'use client'

import { jwtDecode } from "jwt-decode"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import Notification from "@/components/Notification"
import { login } from "@/utils/action"
import Input from "@/components/Input"
import Password from "@/components/svg/Input/Password"
import Button from "@/components/Button"
import Name from "@/components/svg/Input/Name"
import Logo from "@/components/svg/Logo"

export default function UserLogin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [number, setNumber] = useState(Math.floor(Math.random() * 5) + 1);

  const handelFullscreen = () => {
    const doc = document.documentElement;
    if (!document.fullscreenElement) {
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      } else if ((doc as any).webkitRequestFullscreen) {
        (doc as any).webkitRequestFullscreen();
      } else if ((doc as any).msRequestFullscreen) {
        (doc as any).msRequestFullscreen();
      }
    }
  }

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
    if (window?.innerWidth <= 900) {
      handelFullscreen();
    }
    try {
      toast.custom((t) => (
        <Notification
          visible={t.visible}
          message="Logging In..."
          styleTop={'w-full -rotate-90 sm:rotate-0 h-screen'}
        />
      ))
      const response: any = await login({ username, password })
      if (response) {
        if (response?.isUnderMaintenance) {
          toast.remove()
          return toast.custom((t) => (
            <Notification
              styleTop={'w-full h-screen -rotate-90 sm:rotate-0'}
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
                styleTop={'w-full -rotate-90 sm:rotate-0 h-screen'}
                visible={t.visible}
                message="Login Successful"
              />
            ))
            Cookies.set("token", token);
            const randomNumber: number = Math.floor(Math.random() * 10) + 1
            Cookies.set("index", randomNumber.toString())
            router.push("/")
            setTimeout(() => {
              toast.remove()
            }, 1000)
          } else {
            toast.remove()
            toast.custom((t) => (
              <Notification
                styleTop={'w-full h-screen -rotate-90 sm:rotate-0'}
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
    <div className="relative items-center sm:items-start w-screen sm:w-full -rotate-90 sm:rotate-0 h-auto flex justify-evenly">
      <Image
        src="/login/bg-login.png"
        alt="login-bg"
        fill
        priority={true}
        quality={100}
        objectPosition="center"
        className=" object-cover  w-full"
      />
      <form
        onSubmit={handleSubmit}
        className="z-[3] p-[3%]  bg-black rounded-[1vw] bg-opacity-60 sm:bg-transparent sm:static flex justify-center flex-col gap-[3vw] sm:gap-[3vw] w-[88%] sm:w-[35%] h-auto sm:h-[50%] m-auto absolute top-auto "
        autoComplete="off"
      >
        <Logo className={' mx-auto h-auto w-[60%] lg:w-full lg:block sm:hidden'} />
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
            className="mt-2vw z-[100]"
          >
            <Button className="uppercase" text="Login" />
          </button>
        </div>


      </form>
      <div className="relative w-full sm:w-[45%] z-[2]  min-h-screen sm:min-h-[20vw] sm:mr-0 sm:h-[50vw] m-auto">
        <Image
          src={`/login/character${number}.png`}
          alt="login-character"
          fill
          className="z-[2] object-cover sm:object-contain bottom-0"
        />
      </div>
    </div>
  )
}

