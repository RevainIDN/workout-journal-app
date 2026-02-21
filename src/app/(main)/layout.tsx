import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='layout'>
			<Header />
			<main className='content'>
				{children}
			</main>
			<Footer />
		</div>
	)
}