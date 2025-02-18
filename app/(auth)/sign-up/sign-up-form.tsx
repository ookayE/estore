"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
    errors: {},
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // ** Add state for form inputs **
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change and persist data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formValues.name}
            onChange={handleChange}
          />
          {data.errors?.name && (
            <p className="text-red-500">{data.errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {data.errors?.email && (
            <p className="text-red-500">{data.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            value={formValues.password}
            onChange={handleChange}
          />
          {data.errors?.password && (
            <p className="text-red-500">{data.errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          {data.errors?.confirmPassword && (
            <p className="text-red-500">{data.errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <Button className="w-full" variant="default">
            Sign up
          </Button>
        </div>

        {/* Display Errors */}
        {data.message && !data.success && (
          <div className="text-center text-red-500">{data.message}</div>
        )}

        {/* Link to Sign In */}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <a href="/sign-in" className="link">
            Sign In
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
