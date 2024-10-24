import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "../../context/AppContext";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import Remaining from "../Remaining";

test("creates an expense and updates the remaining budget", () => {
  render(
    <AppProvider>
      <AddExpenseForm />
      <Remaining />
      <ExpenseList />
    </AppProvider>
  );

  // Find input elements
  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByText("Save");

  // Simulate user input
  fireEvent.change(nameInput, { target: { value: "Test Expense" } });
  fireEvent.change(costInput, { target: { value: "100" } });
  fireEvent.click(saveButton);

  // Verify the expense is added to the list
  const newExpense = screen.getByText("Test Expense");
  expect(newExpense).toBeInTheDocument();

  // Verify remaining budget is updated correctly
  const remaining = screen.getByText(/Remaining:/);
  expect(remaining).toHaveTextContent("Remaining: $900"); // Assuming initial budget is $1000
});
