"use client";

import axios, { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/routing";
import { useCart } from "@/stores/CartStore";
import { Checkbox } from "@/components/ui/checkbox";

type LoginFormData = {
  email: string;
  password: string;
};

export const MyAccountLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const t = useTranslations("LoginForm");
  const tErrors = useTranslations("LoginForm.errors");
  const router = useRouter();
  const { synchronizeCart } = useCart();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onBlur"
  });

  const onSubmit = async (values: LoginFormData) => {
    // Validate email
    if (!values.email) {
      form.setError("email", { message: tErrors("email-empty") });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      form.setError("email", { message: tErrors("email") });
      return;
    }

    // Validate password
    if (!values.password) {
      form.setError("password", { message: tErrors("password") });
      return;
    }
  console.log("values---", values)
    try {
      const res = await axios.post("/api/customers/login", values);
      console.log("login customer-----> ", res)
      if (res.status === 200 || res.status === 201) {
        void synchronizeCart();
        router.replace("/account/orders");
        router.refresh();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          form.setError("root", { message: t("errors.auth") });
        } else {
          form.setError("root", { message: t("errors.server-error") });
        }
      } else {
        console.log(error);
        form.setError("root", { message: t("errors.server-error") });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-gray-700">
                Username or email address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="" 
                  {...field} 
                  className="bg-gray-100 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 rounded-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-gray-700">
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="" 
                    {...field}
                    className="bg-gray-100 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 rounded-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {form.formState.errors.root?.message && (
          <p className="text-sm text-red-500">{form.formState.errors.root?.message}</p>
        )}

        <Button 
          type="submit" 
          className="bg-gray-900 hover:bg-black text-white py-3 rounded-sm font-medium h-12"
        >
          Log in
        </Button>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="rounded-sm"
          />
          <label
            htmlFor="remember"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link href="/forgot-password" className="hover:underline text-gray-700">
            Lost your password?
          </Link>
        </div>
      </form>
    </Form>
  );
};
