/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginUserMutation } from "@/feature/auth/authSlice";
import { verifyToken } from "@/utils/verfyToken";
import { useState } from "react";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface DecodedToken {
  email: string;
  role: "admin";
  id: string;
  iat: number;
  exp: number;
}

export default function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(data: LoginFormValues) {
    try {
      setError(null);
      const response = await loginUser(data).unwrap();

      if (response.status) {
        toast.success("Login successful!");
        const token = response.data.token;
        const decodedToken = verifyToken(token) as DecodedToken;
        localStorage.setItem("token", token);
        localStorage.setItem("role", decodedToken.role);
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || "Invalid credentials";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "adminpassword",
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg bg-white rounded-xl p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-gray-800 ">Login</CardTitle>
          {error && (
            <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email Address <span className="text-danger">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} className="border-secondary-300 focus:ring-secondary" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password <span className="text-danger">*</span></FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} className="border-secondary-300 focus:ring-secondary" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white font-medium transition-all duration-300 p-3 rounded-lg ${
                  isLoading ? "bg-secondary-500 cursor-not-allowed" : "bg-secondary-500 hover:bg-secondary-500"
                }`}
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
