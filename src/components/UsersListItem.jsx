import { GoTrash } from "react-icons/go";
import { removeUser } from "../store";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
  const [doRemoveUser, isRemovingUser, removingUserError] =
    useThunk(removeUser);

  const handleUserRemove = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button
        className="mr-3"
        onClick={handleUserRemove}
        loading={isRemovingUser}
      >
        <GoTrash />
      </Button>
      {removingUserError && "Error removing user."}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
