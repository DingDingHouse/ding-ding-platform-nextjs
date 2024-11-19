"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Name from "@/components/svg/Input/Name";
import Password from "@/components/svg/Input/Password";
import Logo from "@/components/svg/Logo";
import { login } from "@/utils/action";
import Image from "next/image";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import Notification from "@/components/Notification";

const page = () => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 5) + 1);
  //user data
  const [data, setData] = useState({
    name: "",
    password: "",
  });
  const router = useRouter();

  //onChange function
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.name === "" || data.password === "") {
      return toast.custom((t) => (
        <Notification
          visible={t.visible}
          message="Username and password are required"
        />
      ));
    }

    toast.custom((t) => (
      <Notification visible={t.visible} message="Loggin In..." />
    ));
    const response = await login(data);
    if (response?.isUnderMaintenance) {
      toast.remove();
      return toast.custom((t) => (
        <Notification visible={t.visible} message={response.message} />
      ));
    }
    if (response?.error) {
      toast.remove();
      return toast.custom((t) => (
        <Notification
          visible={t.visible}
          message={response?.error || "Login failed"}
        />
      ));
    }
    const token = response?.token;
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken?.role === "player") {
        toast.remove();
        toast.custom((t) => (
          <Notification visible={t.visible} message="Login successfull!!" />
        ));
        Cookies.set("token", token);
        router.push("/");
      } else {
        toast.remove();
        return toast.custom((t) => (
          <Notification visible={t.visible} message="Access Denied" />
        ));
      }
    } else {
      toast.remove();
      return toast.custom((t) => (
        <Notification visible={t.visible} message="Token not found" />
      ));
    }
  };

  return (
    <div className="h-full w-full relative">
      <div
        style={{ backgroundImage: 'url("/login/bg-login.png")' }}
        className="bg-no-repeat bg-cover w-full h-full flex justify-between overflow-hidden"
      >
        <div className="flex-1 flex flex-col gap-3vw items-center portrait:justify-start landscape:justify-center py-3vw">
          <Logo className="h-15vw w-25vw" />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1-5vw w-[85%] lg:w-[55%] items-center"
          >
            <Input
              name="name"
              value={data.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter Name"
              icon={<Name className="h-[85%] w-[85%]" />}
            />
            <Input
              name="password"
              value={data.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter Password"
              icon={<Password className="h-[85%] w-[85%]" />}
            />
            <button
              type="submit"
              className="mt-2vw w-[30%] md:w-[50%] min-w-fit z-[100]"
            >
              <Button className="uppercase" text="Login" />
            </button>
          </form>
        </div>
        <div className="flex-1 flex flex-col gap-5 items-center justify-end relative">
          <Image
            alt="character"
            src={`/login/character${number}.png`}
            quality={100}
            width={800}
            height={1000}
            sizes={"100%"}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default page;