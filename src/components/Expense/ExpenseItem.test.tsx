import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "../../context/AppContext";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import Remaining from "../Remaining";

test("deletes an expense and updates the remaining budget", () => {
  render(
    <AppProvider>
      <AddExpenseForm />
      <Remaining />
      <ExpenseList />
    </AppProvider>
  );

  // Add an expense
  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByText("Save");

  fireEvent.change(nameInput, { target: { value: "Test Expense" } });
  fireEvent.change(costInput, { target: { value: "100" } });
  fireEvent.click(saveButton);

  // Delete the added expense
  const deleteButton = screen.getByText("x");
  fireEvent.click(deleteButton);

  // Verify the expense is removed
  const deletedExpense = screen.queryByText("Test Expense");
  expect(deletedExpense).not.toBeInTheDocument();

  // Verify remaining budget is reset correctly
  const remaining = screen.getByText(/Remaining:/);
  expect(remaining).toHaveTextContent("Remaining: $1000"); // Assuming initial budget is $1000
});
