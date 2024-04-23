import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const categorias = [
  "Food",
  "Transportation",
  "Bills",
  "Entertainment",
  "Shopping",
] as const;
const schema = z.object({
  description: z.string().min(3),
  price: z.coerce.number().min(1),
  category: z.enum(categorias, { message: "Please select a valid category" }),
});
type formData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: formData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <h3>Add Expense on the list</h3>
      <form
        className="mb-5"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            {...register("description")}
            className="form-control"
            id="description"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            {...register("price")}
            type="number"
            className="form-control"
            id="price"
          />
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            name="category"
            id="category"
            title="Category"
            className="form-select"
          >
            <option value={undefined}>Select a category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <input type="submit" value="Add Expense" className="btn btn-primary" />
      </form>
    </>
  );
};

export default ExpenseForm;
