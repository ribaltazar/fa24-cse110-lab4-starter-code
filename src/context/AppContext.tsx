import { createContext, useState } from "react";
import { Expense } from "../types/types";

// Define the context type with expenses and setExpenses
interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

// Initial state
const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);

  return (
    <AppContext.Provider
      value={{
        expenses,
        setExpenses,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};