import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const VerifyOTPPage = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [isResending, setIsResending] = useState(false)
    const navigate = useNavigate()
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return // Prevent multiple characters

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        const newOtp = [...otp]

        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newOtp[i] = pastedData[i]
        }

        setOtp(newOtp)

        // Focus the next empty input or the last input
        const nextEmptyIndex = newOtp.findIndex(digit => digit === '')
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
        inputRefs.current[focusIndex]?.focus()
    }

    const handleVerify = () => {
        const otpString = otp.join('')
        if (otpString.length === 6) {
            // Navigate to reset password page
            navigate('/reset-password', { state: { email: 'user@lab.com' } })
        }
    }

    const handleResendOTP = async () => {
        setIsResending(true)
        // Simulate API call
        setTimeout(() => {
            setIsResending(false)
            setOtp(['', '', '', '', '', ''])
            inputRefs.current[0]?.focus()
        }, 1000)
    }

    const handleBack = () => {
        navigate('/login')
    }

    const handleSignIn = () => {
        navigate('/login')
    }

    const isOtpComplete = otp.every(digit => digit !== '')

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                </div>

                {/* Subtitle */}
                <div className="text-center mb-8">
                    <p className="text-gray-500">Enter the OTP that's been sent.</p>
                </div>

                {/* OTP Verification Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-8">
                    {/* Card Title */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Verify OTP</h2>
                        <p className="text-gray-600">Check your email for a verification code.</p>
                    </div>

                    {/* OTP Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Enter 6-digit OTP
                        </label>
                        <div className="flex gap-3 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Resend OTP */}
                    <div className="text-center mb-6">
                        <span className="text-gray-600">Didn't receive the code? </span>
                        <button
                            onClick={handleResendOTP}
                            disabled={isResending}
                            className="text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50"
                        >
                            {isResending ? 'Resending...' : 'Resend OTP'}
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={handleBack}
                            className="flex-1 bg-white border border-blue-600 text-blue-600 font-semibold py-3 px-4 rounded-md hover:bg-blue-50 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleVerify}
                            disabled={!isOtpComplete}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors"
                        >
                            Verify
                        </button>
                    </div>

                    {/* Sign In Link */}
                    <div className="text-center">
                        <span className="text-gray-600">Remember your password? </span>
                        <button
                            onClick={handleSignIn}
                            className="text-blue-600 hover:text-blue-500 font-medium"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
