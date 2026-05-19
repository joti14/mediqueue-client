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
import { FaRegEye } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { authClient, signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        console.log('user', user);

        const { data, error } = await signIn.email({
            email: user.email,
            password: user.password,
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

    const handleGoogleLogin = async() => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0b1c30] px-4 py-10">
            <div className="max-w-120 mx-auto">
                <Card className="bg-white dark:bg-[#213145] border border-[#c3c6d7] dark:border-[#737686] rounded-xl p-[24px] md:p-[40px] shadow-sm w-full">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-[#0b1c30] dark:text-white">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-[16px] text-[#434655] dark:text-[#d3e4fe]">
                            Log in to manage your medical schedule.
                        </p>
                    </div>
                    <Form
                        onSubmit={handleLogin}
                        className="flex w-full flex-col gap-5">
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
                                    name='email'
                                    placeholder="jane.smith@university.edu"
                                    className="pl-10 w-full" />
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
                                    name='password'
                                    placeholder="••••••••"
                                    className="pl-10 pr-12 w-full" />
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
                                Login
                                <FaArrowRightLong className="font-bold" />
                            </Button>
                        </div>
                    </Form>

                    <div className="flex justify-center items-center gap-3 my-5">
                        <Separator className="flex-1 bg-[#c3c6d7]/30 dark:bg-[#737686]/30" />
                        <div className="whitespace-nowrap text-xs font-semibold text-[#434655] dark:text-[#d3e4fe] uppercase tracking-wider">
                            Or Login with
                        </div>
                        <Separator className="flex-1 bg-[#c3c6d7]/30 dark:bg-[#737686]/30" />
                    </div>

                    <Button
                        onClick={handleGoogleLogin}
                        variant="bordered"
                        className="w-full py-3 border border-[#c3c6d7] dark:border-[#737686] hover:bg-[#c3c6d7]/10 text-[#0b1c30] dark:text-white rounded-lg flex items-center justify-center gap-2.5 font-bold text-sm"
                    >
                        <FcGoogle className="w-5 h-5 shrink-0" />
                        Continue with Google
                    </Button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#434655] dark:text-[#d3e4fe]">
                            New to MediQueue?{' '}
                            <Link
                                href="/register"
                                className="text-[#004ac6] dark:text-[#dbe1ff] font-bold hover:underline"
                            >
                                Create An Acoount
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;