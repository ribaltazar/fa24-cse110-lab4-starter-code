import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);  // Access the AppContext
  const [name, setName] = useState<string>("");  // State for the name input
  const [cost, setCost] = useState<number>(0);   // State for the cost input

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: Expense = {
      id: (expenses.length + 1).toString(),  // Convert id to string if needed
      name: name,
      cost: cost,
    };

    // Add the new expense to the existing expenses array
    setExpenses([...expenses, newExpense]);

    // Reset the form fields after submission
    setName("");
    setCost(0);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}  // Handle input change
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}  // Handle input change
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;