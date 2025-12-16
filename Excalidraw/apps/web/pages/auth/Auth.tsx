"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";

export default function Auth({ isSignin }: { isSignin: boolean }) {
  const [show, setShow] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signinActionHandler = async () => {
    const payload = {
      email: emailRef?.current?.value,
      password: passwordRef.current?.value,
    };
    const signin = await axios.post(
      `${process.env.NEXT_PUBLIC_HTTP_URL}/signin`,
      payload
    );
  };
  const signupActionHandler = () => {
    axios.post(`${process.env.NEXT_PUBLIC_HTTP_URL}/signup`);
  };
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900">
      <div className="glass-effect rounded-xl p-10 w-[420px] shadow-xl border border-white/10">
        <div className="flex justify-center my-4 text-2xl font-bold bg-gradient-to-r from-emerald-400 to-pink-400 bg-clip-text text-transparent">
          {isSignin ? "SignIn" : "Signup"}{" "}
        </div>

        {/* Email */}
        <div className="mb-6">
          <Input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="text-lg text-white"
          />
        </div>

        {/* Password + Eye */}
        <div className="relative mb-8">
          <Input
            ref={passwordRef}
            type={show ? "text" : "password"}
            placeholder="Password"
            className="text-lg pr-12 text-white" // space for the eye icon
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
          >
            {show ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <Button
            size={"lg"}
            variant={"outline"}
            className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-pink-400 bg-clip-text text-transparent"
            onClick={isSignin ? signinActionHandler : signupActionHandler}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
