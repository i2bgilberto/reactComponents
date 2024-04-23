interface List {
  id: number;
  description: string;
  price: number;
  category: string;
}
interface Props {
  expenses: List[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0)
    return <h3 className="text-center mt-5">No expenses to show</h3>;
  return (
    <>
      <div className="mb-3 p-20 table-responsive">
        <table className="table table-bordered text-center text-uppercase">
          <thead>
            <tr>
              <td>
                <b>#</b>
              </td>
              <td>Description</td>
              <td>Price</td>
              <td>Category</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={2}
                style={{
                  textTransform: "uppercase",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Total
              </td>
              <td>
                $
                {expenses.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ExpenseList;
