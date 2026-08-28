import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  enableSearch: boolean;
  enableShorts: boolean;
  prioritizeNewest: boolean;
  toggleSearch: () => void;
  toggleShorts: () => void;
  togglePrioritizeNewest: () => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      enableSearch: true,
      enableShorts: true,
      prioritizeNewest: false,
      toggleSearch: () => set((state) => ({ enableSearch: !state.enableSearch })),
      toggleShorts: () => set((state) => ({ enableShorts: !state.enableShorts })),
      togglePrioritizeNewest: () => set((state) => ({ prioritizeNewest: !state.prioritizeNewest })),
    }),
    {
      name: 'parental-settings',
    }
  )
);
