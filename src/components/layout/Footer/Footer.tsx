import footerStyles from './Footer.module.css'

export default function Footer() {
	return (
		<footer className={footerStyles.footer}>
			<p>✨ Your wellness journey, beautifully tracked ✨</p>
			<p>All data is stored locally in your browser</p>
		</footer>
	)
}