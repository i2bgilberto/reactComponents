import ExpenseFilter from "./expenseTracker/ExpenseFilter";
import ExpenseList from "./expenseTracker/ExpenseList";
import ExpenseForm from "./expenseTracker/ExpenseForm";
import { useState } from "react";

const ExpenseTracker = () => {
  const [selectCategory, setSelectCategory] = useState(null);
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Groceries", price: 50, category: "Food" },
    { id: 2, description: "Gas", price: 30, category: "Transportation" },
    { id: 3, description: "Restaurant", price: 40, category: "Food" },
    { id: 4, description: "Utilities", price: 100, category: "Bills" },
    {
      id: 5,
      description: "Entertainment",
      price: 20,
      category: "Entertainment",
    },
    { id: 6, description: "Clothing", price: 60, category: "Shopping" },
  ]);

  const visibleExpenses = selectCategory
    ? expenses.filter((item) => item.category === selectCategory)
    : expenses;
  return (
    <>
      <h1 className="text-center mt-5">Expense Tracker</h1>
      <hr />
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([
            ...expenses,
            { ...expense, id: expenses[expenses.length - 1].id + 1 },
          ])
        }
      />
      <ExpenseFilter
        category={[
          "Food",
          "Transportation",
          "Bills",
          "Entertainment",
          "Shopping",
        ]}
        onSelectCategory={(category) => setSelectCategory(category)}
      />

      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(expenses.filter((item) => item.id !== id))
        }
      />
    </>
  );
};

export default ExpenseTracker;
