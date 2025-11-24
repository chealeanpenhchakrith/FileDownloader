import { create } from "zustand";

type State = {
  filterName: string;
};

type Action = {
  updateFilterName: (filterName: State["filterName"]) => void;
};

const useStore = create<State & Action>()((set) => ({
  filterName: "all",
  updateFilterName: (filterName) => set(() => ({ filterName: filterName })),
}));

export { useStore };
