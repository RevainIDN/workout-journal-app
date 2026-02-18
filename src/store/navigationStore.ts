import { create } from 'zustand';

interface NavigationStore {
	navigationItems: { name: string; path: string }[];
}

export const useNavigationStore = create<NavigationStore>((set) => ({
	navigationItems: [
		{ name: 'Today', path: '/' },
		{ name: 'Stats', path: '/stats' },
		{ name: 'History', path: '/history' }
	]
}));