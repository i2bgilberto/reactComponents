interface Expense {
  id: number;
  description: string;
  price: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseTable = ({ expenses, onDelete }: Props) => {
  let index = 0;
  if (expenses.length === 0) return null;
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {expenses.map((expense) => {
            index++;
            return (
              <tr key={expense.id}>
                <th scope="row">{index}</th>
                <td>{expense.description}</td>
                <td>${expense.price}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <th scope="row"></th>
            <td>
              <span>Total</span>
            </td>
            <td>
              $
              <b>{expenses.reduce((acc, expense) => acc + expense.price, 0)}</b>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExpenseTable;
