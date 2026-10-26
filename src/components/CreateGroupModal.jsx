import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Button from "./ui/Button";

function CreateGroupModal({ onClose, onGroupCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateGroup = async () => {
    if (loading) return;

    if (!name.trim()) {
      setError("Enter a group name.");
      toast.warning("Please enter group name");
      return;
    }

    try {
      setLoading(true);

      await api.post("/groups", {
        name,
      });

      await onGroupCreated();
      toast.success("Group Created Successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to create group"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create group"
      description="Create a new expense group to start splitting costs."
      onClose={onClose}
      disableClose={loading}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Creating..." : "Create"}
          </Button>
        </>
      }
    >
      <Input
        label="Group name"
        id="group-name"
        type="text"
        placeholder="e.g. Goa Trip"
        error={error}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        disabled={loading}
      />
    </Modal>
  );
}

export default CreateGroupModal;
