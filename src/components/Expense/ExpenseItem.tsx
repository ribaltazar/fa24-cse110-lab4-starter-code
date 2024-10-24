import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const ExpenseItem = (currentExpense: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);  // Access AppContext

  const handleDeleteExpense = (expenseToDelete: Expense) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== expenseToDelete.id);
    setExpenses(updatedExpenses);  // Update the expenses array
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;