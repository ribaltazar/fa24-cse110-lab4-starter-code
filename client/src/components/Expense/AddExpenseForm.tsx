import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext); 
  const [name, setName] = useState<string>("");  //state for name input
  const [cost, setCost] = useState<number>(0);   //state for cost input

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: Expense = {
      id: (expenses.length + 1).toString(),  //convert id to string
      description: name,
      cost: cost,
    };

    try {
      // Call createExpense to add the expense to the backend
      await createExpense(newExpense);
      //add the new expense to the existing expenses array
      setExpenses([...expenses, newExpense]);

      //reset the form after submission
      setName("");
      setCost(0);
    } catch (error) {
      console.error("Failed to create expense:", error);
    }
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
            onChange={(e) => setName(e.target.value)}  //handle input change
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
            onChange={(e) => setCost(Number(e.target.value))}  //handle input change
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