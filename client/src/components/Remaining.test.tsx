import { render, screen } from "@testing-library/react";
import Remaining from "../components/Remaining";
import { AppContext } from "../context/AppContext";
import { Expense } from "../types/types";

test("should calculate remaining budget and display alert when over budget", () => {
  window.alert = jest.fn();

  const expenses: Expense[] = [{ id: "1", description: "Coffee", cost: 60 }];
  const budget = 50;
  const setExpenses = jest.fn();
  const setBudget = jest.fn();
  const mockSaveBudget = jest.fn();

  render(
    <AppContext.Provider value={{ expenses, setExpenses, budget, setBudget,saveBudget: mockSaveBudget, }}>
      <Remaining />
    </AppContext.Provider>
  );

  expect(screen.getByText(/remaining: \$/i)).toHaveTextContent("Remaining: $-10");
  expect(window.alert).toHaveBeenCalledWith("You have exceeded your budget!");
});