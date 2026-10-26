import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import Modal from "./ui/Modal";
import Select from "./ui/Select";
import Button from "./ui/Button";

function AddMemberModal({ groupId, members, onClose, onMemberAdded }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectionError, setSelectionError] = useState("");

  useEffect(() => {
    let active = true;

    api
      .get("/users?page=0&size=100")
      .then((response) => {
        const memberIds = members.map((member) => member.userId);
        const availableUsers = response.data.content.filter(
          (user) => !memberIds.includes(user.id)
        );

        if (active) {
          setUsers(availableUsers);
        }
      })
      .catch((error) => {
        console.log(error);
        if (active) {
          toast.error("Failed to load users");
        }
      });

    return () => {
      active = false;
    };
  }, [members]);

  const addMember = async () => {
    if (loading) return;

    if (!selectedUser) {
      setSelectionError("Select a user to add.");
      toast.warning("Select a user");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/groups/${groupId}/members/${selectedUser}`);
      toast.success("Member Added");
      onMemberAdded();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to add member"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add member"
      description="Select a user to add to this group."
      onClose={onClose}
      disableClose={loading}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={addMember} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Adding..." : "Add member"}
          </Button>
        </>
      }
    >
      <Select
        label="User"
        id="selected-user"
        error={selectionError}
        disabled={loading}
        value={selectedUser}
        onChange={(e) => {
          setSelectedUser(e.target.value);
          setSelectionError("");
        }}
      >
        <option value="">Select user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </Select>
    </Modal>
  );
}

export default AddMemberModal;
