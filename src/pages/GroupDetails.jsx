import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

    const loadMembers = async () => {

    try {

        const response = await api.get(
            `/groups/members/${id}?page=0&size=20`
        );

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

        toast.error(
            error.response?.data?.message || "Failed to remove member"
        );

    }

};

const deleteGroup = async () => {

    if (!window.confirm("Delete this group?")) {
        return;
    }

    try {

        await api.delete(`/groups/${id}`);

        toast.success("Group deleted successfully");

        navigate("/dashboard");

    } catch (error) {

        console.log(error);

        toast.error(
            error.response?.data?.message || "Failed to delete group"
        );

    }

};

    const loadGroup = async () => {

    try {

        const response = await api.get(`/groups/${id}`);

        console.log("Group Response:", response.data);

        setGroup(response.data);

    } catch (error) {

        console.log("Group Error:", error.response?.data);

        toast.error(
            error.response?.data?.message || "Failed to load group"
        );

        navigate("/dashboard");

    } finally {

        setLoading(false);

    }

};

    const loadExpenses = async () => {

    try {

        const response = await api.get(
            `/expenses/groups/${id}/expenses?page=0&size=20`
        );

        setExpenses(response.data.content);

    } catch (error) {

        console.log(error);

    }

};

const loadBalances = async () => {

    try {

        const response = await api.get(
            `/balances/groups/${id}/balances`
        );

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

        const response = await api.get(
            `/balances/groups/${id}/settlements`
        );

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

        <div className="bg-gray-100 min-h-screen">

                   <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

    <button
        onClick={() => navigate("/dashboard")}
        className="w-full md:w-auto bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-xl"
    >
        ← Back to Dashboard
    </button>

    <button
        onClick={() => setShowExpenseModal(true)}
        className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
    >
        + Add Expense
    </button>

</div>
                    {loading ? (
    <Loading />
) : (
    <>
        <GroupInfo
            group={group}
            isCreator={
                Number(localStorage.getItem("userId")) === group.createdBy.id
            }
            onDeleteGroup={deleteGroup}
        />

        <MemberTable
            members={members}
            onAddMember={() => setShowAddMemberModal(true)}
            onRemoveMember={removeMember}
            isCreator={
                Number(localStorage.getItem("userId")) === group.createdBy.id
            }
            creatorId={group.createdBy.id}
        />

        <ExpenseTable
            expenses={expenses}
            onExpenseDeleted={refreshData}
        />

        <BalanceTable balances={balances} />

        <SettlementTable settlements={settlements} />
    </>
)}

               </div>

{
    showExpenseModal && (

<AddExpenseModal
    groupId={id}
    members={members}
    onClose={() => setShowExpenseModal(false)}
    onExpenseCreated={refreshData}
/>

)



}

{
    showAddMemberModal && (

        <AddMemberModal
            groupId={id}
            members={members}
            onClose={() => setShowAddMemberModal(false)}
            onMemberAdded={loadMembers}
        />

    )
}

       
       

      </Layout>

);

}

export default GroupDetails;