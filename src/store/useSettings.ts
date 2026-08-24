import { create } from 'zustand';

interface SettingsState {
  enableSearch: boolean;
  enableShorts: boolean;
  toggleSearch: () => void;
  toggleShorts: () => void;
}

export const useSettings = create<SettingsState>((set) => ({
  enableSearch: true,
  enableShorts: true,
  toggleSearch: () => set((state) => ({ enableSearch: !state.enableSearch })),
  toggleShorts: () => set((state) => ({ enableShorts: !state.enableShorts })),
}));
