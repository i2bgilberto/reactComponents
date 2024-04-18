import ExpenseForm from "./components/expense-tracker/components/ExpenseForm";
import ExpenseFilter from "./components/expense-tracker/components/ExpenseFilter";
import ExpenseTable from "./components/expense-tracker/components/ExpenseTable";
import { useState } from "react";

function App() {
  const [selectCategory, setSelectCategory] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Car Insurance",
      price: 294.67,
      category: "groceries",
    },
    {
      id: 2,
      description: "Mortgage",
      price: 1000,
      category: "entertainment",
    },
    {
      id: 3,
      description: "Electricity",
      price: 100,
      category: "utilities",
    },
  ]);

  const visibleExpenses = selectCategory
    ? expenses.filter((e) => e.category === selectCategory)
    : expenses;
  return (
    <>
      <ExpenseForm
        onSubmit={(expense) => {
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
        }}
      />
      <ExpenseFilter
        onChangeFilter={(category) => setSelectCategory(category)}
      />
      <ExpenseTable
        expenses={visibleExpenses}
        onDelete={(id) => {
          setExpenses(expenses.filter((e) => e.id !== id));
        }}
      />
    </>
  );
}

export default App;
