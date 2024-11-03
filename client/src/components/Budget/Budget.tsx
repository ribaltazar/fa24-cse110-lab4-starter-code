import React, { useState, useEffect, useContext } from "react";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";
import { AppContext } from "../../context/AppContext";


const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState<number>(budget);

  
// Function to load budget and handle errors
const loadBudget = async () => {
  try {
    const fetchedBudget = await fetchBudget();
    setBudget(fetchedBudget);
    setNewBudget(fetchedBudget);
  } catch (error: any) {
    console.error("Failed to load budget:", error.message);
  }
};

// Fetch budget on component mount
useEffect(() => {
  loadBudget();
}, []);

  // Handle saving the new budget to the backend
  const handleSave = async () => {
    try {
      const updatedBudget = await updateBudget(newBudget);
      setBudget(updatedBudget);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update budget:", error);
    }
  };
    
  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
            className="form-control"
          />
          <button onClick={handleSave} className="btn btn-primary ms-2">
            Save
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <span>Budget: ${budget}</span>
          <button onClick={() => setIsEditing(true)} className="btn btn-secondary ms-2">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Budget;
