import { useContext, createContext } from "react";

const guestTodoContext = createContext({
  todos: [],
  addGuest: () => {},
  deleteGuest: () => {},
  updateSplitBillMessage: () => {},
  closeSection: () => {},
});

export const GuestTodoContextProvider = guestTodoContext.Provider;

export default function useGuestTodo() {
  return useContext(guestTodoContext);
}
