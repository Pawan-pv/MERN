
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext"; // Ensure correct import path
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const queryClient = useQueryClient()
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
            showToast({ message: "User has been signed in", type: "SUCCESS" });
            navigate("/");
        },
        onError: (error) => {
            console.log("error", error);
            showToast({ message: "Sign in failed", type: "ERROR" });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold">
                Email
                <input
                    type="email"
                    className="border rounded w-full py-1 font-normal"
                    {...register("email", { required: "This field is required" })}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold">
                Password
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
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not Registered? <Link className="underline" to="/register" >Create an account here</Link>
                </span>
            <button 
            type="submit" 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
            </span>
        </form>
    );
}

export default SignIn;
