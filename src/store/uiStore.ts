import { create } from 'zustand';

interface UIStore {
	darkMode: boolean;
	notificationMessage: string;
	isNotificationShow: boolean;
	toggleDarkMode: () => void;
	showNotification: (state: boolean, message: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
	darkMode: false,
	notificationMessage: '',
	isNotificationShow: false,
	toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
	showNotification: (state: boolean, message: string) => set(() => ({ isNotificationShow: state, notificationMessage: message }))
}));