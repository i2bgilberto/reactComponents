interface List {
  description: string;
  price: number;
}
interface Props {
  expenses: List[];
}

const ExpenseList = ({ expenses }: Props) => {
  return (
    <>
      <div className="mb-3">
        <table className="table table-bordered text-center text-uppercase">
          <thead>
            <tr>
              <td>
                <b>#</b>
              </td>
              <td>Description</td>
              <td>Price</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
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
              <td>0</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ExpenseList;
