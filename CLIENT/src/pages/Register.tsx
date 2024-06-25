import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import {useNavigate} from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: ()=>{
      // console.log("registeration succesful!")
      showToast({message: "Rgistration success!", type: "SUCCESS"});
      // navigating to the home page
      navigate("/")
      
    },
    onError: (error: Error) =>{
      showToast({message: error.message, type: "ERROR"})
    }
  });
  

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold">First Name</label>
          <input
            type="text"
            className="border rounded w-full py-1 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold">Last Name</label>
          <input
            type="text"
            className="border rounded w-full py-1 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold">Email</label>
          <input
            type="email"
            className="border rounded w-full py-1 font-normal"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold">Password</label>
          <input
            type="password"
            className="border rounded w-full py-1 font-normal"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold">Confirm Password</label>
          <input
            type="password"
            className="border rounded w-full py-1 font-normal"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Create Account
      </button>
    </form>
  );
};

export default Register;
