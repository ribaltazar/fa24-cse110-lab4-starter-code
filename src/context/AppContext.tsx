import { createContext, useState } from "react";
import { Expense } from "../types/types";

// Define the context type with expenses and setExpenses
interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;  // Add budget property here
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

// Initial state
const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 1000,  // Set an initial budget value
  setBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        expenses,
        setExpenses,
        budget,  // Provide budget here
        setBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};