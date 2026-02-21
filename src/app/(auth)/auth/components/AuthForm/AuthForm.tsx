'use client'

import authFormStyles from './AuthForm.module.css'
import { useState } from 'react'
import Link from 'next/link'

type AuthFormProp = 'login' | 'register'

export default function AuthForm({ mode }: { mode: AuthFormProp }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const isLogin = mode === 'login'

	return (
		<form className={authFormStyles.authForm}>
			<div className={authFormStyles.header}>
				<h1 className={authFormStyles.title}>
					{isLogin ? "Welcome back" : "Create account"}
				</h1>
				<p className={authFormStyles.subtitle}>Track your workouts and progress.</p>
			</div>

			<label className={authFormStyles.label} htmlFor="email">
				<h2>Email address</h2>
				<input id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			</label>

			<label className={authFormStyles.label} htmlFor="password">
				<h2>Password</h2>
				<input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</label>

			<button className={authFormStyles.submitButton} type="submit">
				{isLogin ? "Log in" : "Sign up"}
			</button>

			{!isLogin ? (
				<p className={authFormStyles.footerText}>
					Already have an account?
					<Link href={'/auth/login'} className={authFormStyles.link}> Log in</Link>
				</p>
			) : (
				<p className={authFormStyles.footerText}>
					New to My Wellness Journey?
					<Link href={'/auth/register'} className={authFormStyles.link}> Create account</Link>
				</p>
			)}
		</form>
	)
}