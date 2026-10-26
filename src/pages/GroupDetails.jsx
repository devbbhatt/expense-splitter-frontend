import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import MemberTable from "../components/MemberTable";
import ExpenseTable from "../components/ExpenseTable";
import BalanceTable from "../components/BalanceTable";
import SettlementTable from "../components/SettlementTable";
import AddExpenseModal from "../components/AddExpenseModal";
import { toast } from "react-toastify";
import api from "../services/api";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import GroupInfo from "../components/GroupInfo";
import AddMemberModal from "../components/AddMemberModal";
import Button from "../components/ui/Button";

function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState(false);

  const loadMembers = async () => {
    try {
      const response = await api.get(`/groups/members/${id}?page=0&size=20`);
      setMembers(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const removeMember = async (userId) => {
    if (!window.confirm("Remove this member?")) {
      return;
    }

    try {
      await api.delete(`/groups/${id}/members/${userId}`);
      toast.success("Member removed successfully");
      loadMembers();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to remove member");
    }
  };

  const deleteGroup = async () => {
    if (deletingGroup) return;

    if (!window.confirm("Delete this group?")) {
      return;
    }

    try {
      setDeletingGroup(true);
      await api.delete(`/groups/${id}`);
      toast.success("Group deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete group");
    } finally {
      setDeletingGroup(false);
    }
  };

  const loadGroup = async () => {
    try {
      const response = await api.get(`/groups/${id}`);
      console.log("Group Response:", response.data);
      setGroup(response.data);
    } catch (error) {
      console.log("Group Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to load group");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const loadExpenses = async () => {
    try {
      const response = await api.get(`/expenses/groups/${id}/expenses?page=0&size=20`);
      setExpenses(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const loadBalances = async () => {
    try {
      const response = await api.get(`/balances/groups/${id}/balances`);
      console.log("Full Response:", response);
      console.log("Response Data:", response.data);
      console.log("Is Array:", Array.isArray(response.data));
      setBalances(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSettlements = async () => {
    try {
      const response = await api.get(`/balances/groups/${id}/settlements`);
      setSettlements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadGroup();
    loadExpenses();
    loadMembers();
    loadBalances();
    loadSettlements();
  }, []);

  const refreshData = () => {
    loadExpenses();
    loadBalances();
    loadSettlements();
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="secondary" onClick={() => navigate("/dashboard")} className="w-full sm:w-auto">
          <ArrowLeft size={16} />
          Back to dashboard
        </Button>
        <Button onClick={() => setShowExpenseModal(true)} className="w-full sm:w-auto">
          <Plus size={16} />
          Add expense
        </Button>
      </div>

      {loading ? (
        <Loading label="Loading group" />
      ) : (
        <>
          <GroupInfo
            group={group}
            isCreator={Number(localStorage.getItem("userId")) === group.createdBy.id}
            onDeleteGroup={deleteGroup}
            deletingGroup={deletingGroup}
          />

          <MemberTable
            members={members}
            onAddMember={() => setShowAddMemberModal(true)}
            onRemoveMember={removeMember}
            isCreator={Number(localStorage.getItem("userId")) === group.createdBy.id}
            creatorId={group.createdBy.id}
          />

          <ExpenseTable expenses={expenses} onExpenseDeleted={refreshData} />
          <BalanceTable balances={balances} />
          <SettlementTable settlements={settlements} />
        </>
      )}

      {showExpenseModal && (
        <AddExpenseModal
          groupId={id}
          members={members}
          onClose={() => setShowExpenseModal(false)}
          onExpenseCreated={refreshData}
        />
      )}

      {showAddMemberModal && (
        <AddMemberModal
          groupId={id}
          members={members}
          onClose={() => setShowAddMemberModal(false)}
          onMemberAdded={loadMembers}
        />
      )}
    </Layout>
  );
}

export default GroupDetails;
