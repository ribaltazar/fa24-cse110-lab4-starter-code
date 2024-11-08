import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext); //access AppContext

  const handleDeleteExpense = async (expenseToDelete: Expense) => {
    try {
      // Call deleteExpense to delete the item from the backend
      await deleteExpense(expenseToDelete.id);
      const updatedExpenses = expenses.filter(expense => expense.id !== expenseToDelete.id);
      setExpenses(updatedExpenses);  //update expenses array
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;