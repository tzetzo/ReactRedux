import { GoTrash } from "react-icons/go";
import { removeUser } from "../store";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";

function UsersListItem({ user }) {
  const [doRemoveUser, isRemovingUser, removingUserError] =
    useThunk(removeUser);

  const handleUserRemove = () => {
    doRemoveUser(user);
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          <Button
            className="mr-3"
            onClick={handleUserRemove}
            loading={isRemovingUser}
          >
            <GoTrash />
          </Button>
          {removingUserError && "Error removing user."}
          {user.name}
        </div>
      </div>
    </div>
  );
}

export default UsersListItem;
