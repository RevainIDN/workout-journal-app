'use client'

import headerStyles from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigationStore } from '@/store/navigationStore';

export default function Header() {
	const pathname = usePathname();
	const navigationItems = useNavigationStore((state) => state.navigationItems);

	const activeTab = navigationItems.find(item => item.path === pathname)?.name.toLowerCase() || 'today';

	return (
		<header className={headerStyles.header}>
			<div className={headerStyles.headerContainer}>
				<div className={headerStyles.headerContent}>
					<div className={headerStyles.logo}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8.2A2.22 2.22 0 0 0 13.8 6c-.8 0-1.4.3-1.8.9-.4-.6-1-.9-1.8-.9A2.22 2.22 0 0 0 8 8.2c0 .6.3 1.2.7 1.6A226.652 226.652 0 0 0 12 13a404 404 0 0 0 3.3-3.1 2.413 2.413 0 0 0 .7-1.7"></path><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path></svg>
					</div>
					<div className={headerStyles.titleContainer}>
						<div className={headerStyles.title}>
							<h1>My Wellness Journey</h1>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a1d9e7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
						</div>
						<p className={headerStyles.subtitle}>Your personal fitness & nutrition companion</p>
					</div>
					<ul className={headerStyles.navLinks}>
						{navigationItems.map((item) => (
							<li key={item.path} className={`${headerStyles.navLink} ${activeTab === item.name.toLowerCase() ? headerStyles.navLinkActive : ''}`}>
								<Link href={item.path}>{item.name}</Link>
							</li>
						))}
					</ul>
				</div>
				<div className={headerStyles.userActions}>
					<button className={headerStyles.loginButton}>
						Log In
					</button>
				</div>
			</div>
		</header>
	)
}