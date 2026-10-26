import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus, Receipt } from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import PageHeader from "../components/ui/PageHeader";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import AddExpenseModal from "../components/AddExpenseModal";
import CreateGroupModal from "../components/CreateGroupModal";

function AddExpense() {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const fetchGroups = async () => {
    const response = await api.get("/groups?page=0&size=20");
    return response.data.content;
  };

  const loadGroups = async () => {
    try {
      setGroups(await fetchGroups());
    } catch (error) {
      console.log(error);
      toast.error("Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    fetchGroups()
      .then((loadedGroups) => {
        if (active) {
          setGroups(loadedGroups);
        }
      })
      .catch((error) => {
        console.log(error);
        if (active) {
          toast.error("Failed to load groups");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleGroupChange = async (groupId) => {
    setSelectedGroupId(groupId);
    setMembers([]);

    if (!groupId) {
      return;
    }

    try {
      setLoadingMembers(true);
      const response = await api.get(`/groups/members/${groupId}?page=0&size=20`);
      setMembers(response.data.content);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load group members");
    } finally {
      setLoadingMembers(false);
    }
  };

  const selectedGroup = groups.find(
    (group) => String(group.id) === String(selectedGroupId)
  );

  return (
    <Layout>
      <PageHeader
        title="Add expense"
        description="Choose a group, then record an equal or exact split."
      />

      {loading ? (
        <Loading label="Loading groups" />
      ) : groups.length === 0 ? (
        <div className="section-card">
          <EmptyState
            icon={Receipt}
            title="Create a group first"
            description="Expenses belong to a group. Create one to start adding costs."
            action={
              <Button onClick={() => setShowGroupModal(true)}>
                <Plus size={16} />
                Create group
              </Button>
            }
          />
        </div>
      ) : (
        <div className="section-card max-w-xl p-5 md:p-6">
          <Select
            label="Group"
            id="expense-group"
            value={selectedGroupId}
            onChange={(e) => handleGroupChange(e.target.value)}
          >
            <option value="">Select a group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Select>

          {selectedGroup && (
            <p className="mt-3 text-sm text-muted">
              {loadingMembers
                ? "Loading members..."
                : `${members.length} member${members.length === 1 ? "" : "s"} in ${selectedGroup.name}`}
            </p>
          )}

          <Button
            className="mt-6 w-full sm:w-auto"
            onClick={() => setShowExpenseModal(true)}
            disabled={!selectedGroupId || loadingMembers}
          >
            <Plus size={16} />
            Add expense
          </Button>
        </div>
      )}

      {showExpenseModal && (
        <AddExpenseModal
          groupId={selectedGroupId}
          members={members}
          onClose={() => setShowExpenseModal(false)}
          onExpenseCreated={() => {}}
        />
      )}

      {showGroupModal && (
        <CreateGroupModal
          onClose={() => setShowGroupModal(false)}
          onGroupCreated={loadGroups}
        />
      )}
    </Layout>
  );
}

export default AddExpense;
