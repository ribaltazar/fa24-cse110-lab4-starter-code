import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "../../context/AppContext";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import Remaining from "../Remaining";

test("budget balance verification after multiple operations", () => {
  render(
    <AppProvider>
      <AddExpenseForm />
      <Remaining />
      <ExpenseList />
    </AppProvider>
  );

  // Add multiple expenses
  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByText("Save");

  fireEvent.change(nameInput, { target: { value: "Expense 1" } });
  fireEvent.change(costInput, { target: { value: "100" } });
  fireEvent.click(saveButton);

  fireEvent.change(nameInput, { target: { value: "Expense 2" } });
  fireEvent.change(costInput, { target: { value: "200" } });
  fireEvent.click(saveButton);

  // Verify remaining budget
  const remaining = screen.getByText(/Remaining:/);
  expect(remaining).toHaveTextContent("Remaining: $700"); // Assuming initial budget is $1000

  // Verify the budget equation holds
  const totalSpent = 100 + 200;
  expect(remaining).toHaveTextContent(`Remaining: $${1000 - totalSpent}`);
});
