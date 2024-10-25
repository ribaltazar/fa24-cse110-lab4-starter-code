import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

test("should delete an expense from the context", () => {
  const mockSetExpenses = jest.fn();
  const expenses: Expense[] = [{ id: "1", name: "Coffee", cost: 5 }];
  const budget = 1000;
  const setBudget = jest.fn();

  render(
    <AppContext.Provider value={{ expenses, setExpenses: mockSetExpenses, budget, setBudget }}>
      <ExpenseItem id="1" name="Coffee" cost={5} />
    </AppContext.Provider>
  );

  fireEvent.click(screen.getByText(/x/i));

  expect(mockSetExpenses).toHaveBeenCalledWith([]);
});