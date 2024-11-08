import { API_BASE_URL } from "../constants/constants";
import { Budget } from "../types/types";

// Function to get the budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/budget`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch budget");
  }
  
  const data = await response.json();
  return data.amount;
};

export const updateBudget = async (budget: number): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: budget }),
      });
    
      if (!response.ok) {
        throw new Error("Failed to update budget");
      }
    
      const data = await response.json();
      return data.amount; 
    };