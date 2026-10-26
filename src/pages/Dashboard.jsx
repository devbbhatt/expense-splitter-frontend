import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight, FolderKanban, Plus, Scale } from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";
import Loading, { Skeleton } from "../components/Loading";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { toast } from "react-toastify";
import { useCurrentUser } from "../context/UserContext";
import { formatCurrency } from "../utils/format";

function Dashboard() {
  return (
    <Layout>
      <DashboardPage />
    </Layout>
  );
}

function DashboardPage() {
  const [groups, setGroups] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [groupsResult, balancesResult] = await Promise.allSettled([
        api.get("/groups?page=0&size=10"),
        api.get("/balances/me"),
      ]);

      if (groupsResult.status === "fulfilled") {
        setGroups(groupsResult.value.data.content);
      } else {
        console.log(groupsResult.reason);
        toast.error("Failed to load groups");
      }

      if (balancesResult.status === "fulfilled") {
        const data = balancesResult.value.data;
        setBalances(Array.isArray(data) ? data : []);
      } else {
        console.log(balancesResult.reason);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const netBalance = balances.reduce((sum, item) => sum + item.balance, 0);
  const youOwe = balances
    .filter((item) => item.balance < 0)
    .reduce((sum, item) => sum + Math.abs(item.balance), 0);
  const youAreOwed = balances
    .filter((item) => item.balance > 0)
    .reduce((sum, item) => sum + item.balance, 0);

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <>
      <PageHeader
        title={firstName ? `Welcome back, ${firstName}` : "Welcome"}
        description="Review your groups, balances, and recent activity in one place."
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate("/expense")} className="w-full sm:w-auto">
              Add expense
            </Button>
            <Button onClick={() => setShowModal(true)} className="w-full sm:w-auto">
              <Plus size={16} />
              Create group
            </Button>
          </>
        }
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Net balance"
            value={formatCurrency(netBalance)}
            tone={netBalance >= 0 ? "positive" : "negative"}
            icon={Scale}
            hint={netBalance >= 0 ? "Overall receivable" : "Overall owed"}
          />
          <SummaryCard
            label="You owe"
            value={formatCurrency(youOwe)}
            tone="negative"
            icon={ArrowDownRight}
            hint="Amounts you still need to pay"
          />
          <SummaryCard
            label="You are owed"
            value={formatCurrency(youAreOwed)}
            tone="positive"
            icon={ArrowUpRight}
            hint="Amounts others owe you"
          />
          <SummaryCard
            label="Total groups"
            value={groups.length}
            icon={FolderKanban}
            hint="Groups currently loaded"
          />
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-ink">Your groups</h2>
              <p className="text-sm text-muted">Jump back into a group to manage expenses.</p>
            </div>
            <Button variant="ghost" onClick={() => navigate("/groups")}>
              View all
            </Button>
          </div>

          {loading ? (
            <Loading label="Loading groups" />
          ) : groups.length === 0 ? (
            <div className="section-card">
              <EmptyState
                icon={FolderKanban}
                title="No groups yet"
                description="Create your first expense group to start splitting costs."
                action={
                  <Button onClick={() => setShowModal(true)}>
                    <Plus size={16} />
                    Create group
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </section>

        <section className="section-card h-fit overflow-hidden">
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-base font-semibold text-ink">Group balances</h2>
            <p className="mt-0.5 text-sm text-muted">Your net position in each group.</p>
          </div>
          {loading ? (
            <div className="space-y-3 p-5">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          ) : balances.length === 0 ? (
            <EmptyState
              icon={Scale}
              title="No balances yet"
              description="Balances appear after expenses are added to your groups."
            />
          ) : (
            <ul className="divide-y divide-line">
              {balances.map((item, index) => (
                <li key={index} className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{item.groupName}</p>
                    <p className="text-xs text-muted">
                      {item.balance >= 0 ? "You are owed" : "You owe"}
                    </p>
                  </div>
                  <p
                    className={`financial-value shrink-0 text-sm font-semibold ${
                      item.balance >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {formatCurrency(item.balance)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {showModal && (
        <CreateGroupModal
          onClose={() => setShowModal(false)}
          onGroupCreated={loadDashboard}
        />
      )}
    </>
  );
}

function SummaryCard({ label, value, hint, icon: Icon, tone }) {
  const valueClass =
    tone === "positive"
      ? "text-success"
      : tone === "negative"
        ? "text-danger"
        : "text-ink";

  return (
    <div className="section-card p-5 transition-colors hover:border-brand/25">
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted">{label}</p>
        <div className="rounded-xl bg-brand-soft p-2.5 text-brand" aria-hidden="true">
          <Icon size={17} strokeWidth={1.8} />
        </div>
      </div>
      <p className={`financial-value mt-4 text-2xl font-semibold ${valueClass}`}>{value}</p>
      <p className="mt-1.5 text-xs leading-5 text-muted">{hint}</p>
    </div>
  );
}

export default Dashboard;
