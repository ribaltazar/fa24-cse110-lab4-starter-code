import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);
  //set budget value

  //calculate total expenses using reduce
  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  //determine alert type based on remaining budget
  const remaining = budget - totalExpenses;
  const alertType = remaining < 0 ? "alert-danger" : "alert-success";

  //alert if remaining balance is less than 0
  useEffect(() => {
    if (remaining < 0) {
      alert("You have exceeded your budget!");
    }
  }, [remaining]); //add an alert when remaining is negative

  return (
    <div className={`alert ${alertType}`}>
      <span>
        Remaining: ${remaining}
      </span>
    </div>
  );
};

export default Remaining;