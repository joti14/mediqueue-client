'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from '@heroui/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { IoEyeOffOutline } from 'react-icons/io5';
import { FaRegEye, FaRegUser } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaArrowRightLong } from 'react-icons/fa6';
import { signUp } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log('user', user);

    const { data, error } = await signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
      callbackURL: '/',
    });

    if (data) {
      toast.success('Registration successful!');
      router.push('/');
      router.refresh();
    }

    if (error) {
      console.log('registration error:', error);
      toast.error(error.message || 'Registration failed!');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0b1c30] px-4 py-10">
      <div className="max-w-[480px] mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-[#0b1c30] dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-[16px] text-[#434655] dark:text-[#d3e4fe]">
            Join the elite network of medical students and professional tutors today.
          </p>
        </div>

        <Card className="bg-white dark:bg-[#213145] border border-[#c3c6d7] dark:border-[#737686] rounded-xl p-[24px] md:p-[40px] shadow-sm w-full">
          <Form onSubmit={handleRegister} className="flex w-full flex-col gap-5">
            <TextField isRequired name="name" type="text" className="w-full">
              <Label className="text-[12px] font-bold text-[#434655] dark:text-[#d3e4fe] uppercase tracking-wider">
                Full Name
              </Label>
              <div className="relative">
                <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <Input
                  name="name"
                  placeholder="Dr. Jane Smith"
                  className="pl-10 w-full"
                />
              </div>
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return 'Please enter a valid email address';
                }
                return null;
              }}
            >
              <Label className="text-[12px] font-bold text-[#434655] dark:text-[#d3e4fe] uppercase tracking-wider">
                Academic Email
              </Label>
              <div className="relative">
                <MdMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <Input
                  name="email"
                  placeholder="jane.smith@university.edu"
                  className="pl-10 w-full"
                />
              </div>
              <FieldError />
            </TextField>

            <TextField name="image" type="url" className="w-full">
              <Label className="text-[12px] font-bold text-[#434655] dark:text-[#d3e4fe] uppercase tracking-wider">
                Profile Photo URL
              </Label>
              <div className="relative">
                <HiOutlinePhotograph className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <Input
                  name="image"
                  placeholder="https://image-placeholder.com/avatar.jpg"
                  className="pl-10 w-full"
                />
              </div>
              <FieldError />
            </TextField>

            <TextField
              isRequired
              minLength={6}
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full"
              validate={(value) => {
                if (value.length < 6) {
                  return 'Password must be at least 6 characters';
                }
                if (!/[A-Z]/.test(value)) {
                  return 'Password must contain at least one uppercase letter';
                }
                if (!/[0-9]/.test(value)) {
                  return 'Password must contain at least one number';
                }
                return null;
              }}
            >
              <Label className="text-[12px] font-bold text-[#434655] dark:text-[#d3e4fe] uppercase tracking-wider">
                Secure Password
              </Label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <Input
                  name="password"
                  placeholder="••••••••"
                  className="pl-10 pr-12 w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 z-10"
                >
                  {showPassword ? <FaRegEye /> : <IoEyeOffOutline />}
                </button>
              </div>
              <Description className="text-slate-400 text-[11px] mt-1.5 leading-tight">
                Must be 6+ characters with at least 1 uppercase and 1 number.
              </Description>
              <FieldError />
            </TextField>

            <div className="flex justify-center mt-2">
              <Button
                className="w-full py-4 bg-[#004ac6] text-white hover:bg-[#2563eb] font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                Register
                <FaArrowRightLong className="font-bold" />
              </Button>
            </div>
          </Form>

          <div className="flex justify-center items-center gap-3 my-5">
            <Separator className="flex-1 bg-[#c3c6d7]/30 dark:bg-[#737686]/30" />
            <div className="whitespace-nowrap text-xs font-semibold text-[#434655] dark:text-[#d3e4fe] uppercase tracking-wider">
              Or register with
            </div>
            <Separator className="flex-1 bg-[#c3c6d7]/30 dark:bg-[#737686]/30" />
          </div>

          <Button
            variant="bordered"
            className="w-full py-3 border border-[#c3c6d7] dark:border-[#737686] hover:bg-[#c3c6d7]/10 text-[#0b1c30] dark:text-white rounded-lg flex items-center justify-center gap-2.5 font-bold text-sm"
          >
            <FcGoogle className="w-5 h-5 flex-shrink-0" />
            Continue with Google
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#434655] dark:text-[#d3e4fe]">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#004ac6] dark:text-[#dbe1ff] font-bold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;