import { useMyItems } from "../../features/listing/hoooks/useMyItems";
import { Link } from "react-router-dom";
import { useDeleteItem } from "../../features/listing/hoooks/useDeleteItem";
import { useToggleItem } from "../../features/listing/hoooks/useToggleItem";

const MyItems = () => {
  const { data, isPending, error } = useMyItems();
  const { mutate: deleteItem } = useDeleteItem();
  const { mutate: toggleSatus } = useToggleItem();

  const handleOnDelete = (itemId: string) => {
    deleteItem({ itemId });
  };

  const handleToggle = (itemId: string) => {
    toggleSatus({ itemId });
  };

  if (isPending) {
    return <div>Loding items</div>;
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }
  return (
    <div className="grid grid-cols-3 w-full h-fit gap-4 p-5 text-body text-text-muted capitalize">
      {data.data.map((item) => (
        <div className="w-full h-full bg-card border border-accent rounded overflow-clip">
          <div className="w-full">
            <img src={item.images[0].url} alt="" className="object-fill" />
          </div>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-heading">{item.title}</h1>
              <button
                className={
                  item.status === "AVAILABLE"
                    ? "bg-primary px-2 py-1 rounded-2xl text-xs text-body text-text-primary cursor-pointer"
                    : "bg-red-500 px-2 py-1 rounded-2xl text-xs text-body text-text-primary cursor-pointer"
                }
                onClick={() => handleToggle(item._id)}
              >
                ChangeStatus
              </button>
            </div>
            <p className="text-sm overflow-hidden w-full  truncate">
              {item.description}
            </p>
            <div className="flex items-center justify-between text-xs ">
              <span>
                <span className="text-text-primary">Category:</span>{" "}
                {item.category}
              </span>
              <span
                className={
                  item.status === "AVAILABLE" ? "text-primary" : "text-red-500"
                }
              >
                <span className="text-text-primary">status:</span> {item.status}
              </span>
              <span>
                <span className="text-text-primary">Price:</span> ₹{item.price}
              </span>
            </div>
          </div>
          <div className="p-2 w-full flex items-center justify-center gap-3">
            <Link
              to={`/market-place/edit-item/${item._id}`}
              className="bg-primary w-full px-4 py-2 rounded text-sm text-text-primary text-center hover:bg-primary-hover"
            >
              Edit item
            </Link>
            <button
              className="bg-red-600 w-full px-4 py-2 rounded text-sm text-text-primary text-center hover:bg-red-500"
              onClick={() => handleOnDelete(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyItems;
