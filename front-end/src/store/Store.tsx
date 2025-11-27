import { create } from "zustand";

type State = {
  filterType: string;
  fileName: string;
};

type Action = {
  updateFilterType: (filterType: State["filterType"]) => void;
  updateFilterName: (fileName: State["fileName"]) => void;
};

const useStore = create<State & Action>()((set) => ({
  filterType: "all",
  fileName: "",
  updateFilterType: (filterType) => set(() => ({ filterType: filterType })),
  updateFilterName: (fileName) => set(() => ({ fileName: fileName })),
}));

export { useStore };
