import { createContext, ReactNode, useEffect, useState } from "react";
import { Expense } from "../types/types";
import { fetchBudget, updateBudget } from "../utils/budget-utils";

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
  saveBudget: (newBudget: number) => Promise<void>;
}


const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 0,  //initial budget value
  setBudget: () => {},
  saveBudget: async () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  useEffect(() => {
    const loadInitialBudget = async () => {
      try {
        const initialBudget = await fetchBudget(); // Fetch from backend or local storage
        setBudget(initialBudget);
      } catch (error) {
        console.error("Failed to load initial budget:", error);
      }
    };
    loadInitialBudget();
  }, []);
  
  const saveBudget = async (newBudget: number) => {
    try {
      const updatedBudget = await updateBudget(newBudget); 
      setBudget(updatedBudget); 
    } catch (error) {
      console.error("Failed to update budget:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        expenses,
        setExpenses,
        budget,
        setBudget,
        saveBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};