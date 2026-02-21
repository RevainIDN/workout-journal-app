import layoutStyles from './layout.module.css'

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
	return (
		<main className={layoutStyles.authLayout}>
			<div className={layoutStyles.authLayoutContent}>
				{children}
			</div>
		</main>
	)
}