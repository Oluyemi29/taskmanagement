import { Button, Card, Input } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { RegFormSchema } from "../types/formSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { userAuthStore } from "../store/authStore";

const RegisterComponent = () => {
  const { Register } = userAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  type RegFormSchemaType = z.infer<typeof RegFormSchema>;
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<RegFormSchemaType>({
    resolver: zodResolver(RegFormSchema),
  });
  const submit = async (formData: RegFormSchemaType) => {
    try {
      setLoading(true);
      const { email, name, password } = formData;
      const response = await Register(email, name, password);
      if (response) {
        return navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <Card className="lg:w-1/3 md:1/2 w-full mt-16 rounded-xl bg-maingreen">
        <div className="flex flex-col justify-start p-5">
          <h1 className="text-white font-semibold text-2xl">
            Task Management System
          </h1>
          <p className="text-white text-sm ">
            welcome to Task management system registration page
          </p>
        </div>
        <div className="p-5 bg-white/90 rounded-xl flex flex-col gap-4">
          <h1 className="text-maingreen font-semibold text-xl">Register</h1>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
            <Input
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              name="name"
              label={"Name"}
              placeholder="Name"
              type="text"
            />
            <Input
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              name="email"
              label={"Email"}
              placeholder="Email"
              type="email"
              startContent={<MdEmail className="text-maingreen" />}
            />
            <Input
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              name="password"
              label={"Password"}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              startContent={<RiLockPasswordFill className="text-maingreen" />}
              endContent={
                showPassword ? (
                  <FaRegEyeSlash
                    onClick={() => setShowPassword(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <FaRegEye
                    onClick={() => setShowPassword(true)}
                    className="cursor-pointer"
                  />
                )
              }
            />
            {loading ? (
              <Button
                type="button"
                className="bg-maingreen/75 text-white h-12 mt-10 font-semibold w-full cursor-not-allowed"
                isDisabled
                isLoading
              >
                Processing...
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-maingreen  text-white h-12 mt-10 font-semibold w-full "
              >
                Submited
              </Button>
            )}

            <p className="text-end text-[0.9rem]">
              Already have an account?
              <Link
                className="italic underline pl-1 underline-offset-2 text-maingreen font-semibold"
                to={"/login"}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default RegisterComponent;
