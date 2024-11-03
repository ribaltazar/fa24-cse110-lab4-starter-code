import { render, screen, fireEvent } from "@testing-library/react";
import AddExpenseForm from "./AddExpenseForm";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

test("should add a new expense to the context", () => {
  const mockSetExpenses = jest.fn();
  const mockSaveBudget = jest.fn();
  const expenses: Expense[] = [];
  const budget = 1000;
  const setBudget = jest.fn();

  render(
    <AppContext.Provider value={{ expenses, setExpenses: mockSetExpenses, budget, setBudget, saveBudget: mockSaveBudget, }}>
      <AddExpenseForm />
    </AppContext.Provider>
  );

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Coffee" } });
  fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: "5" } });

  fireEvent.click(screen.getByText(/save/i));

  expect(mockSetExpenses).toHaveBeenCalledWith([{ id: "1", name: "Coffee", cost: 5 }]);
});