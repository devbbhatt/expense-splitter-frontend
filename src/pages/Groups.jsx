import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FolderKanban, Plus, Search } from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadGroups = async () => {
    try {
      const response = await api.get("/groups?page=0&size=20");
      setGroups(response.data.content);
      setFilteredGroups(response.data.content);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    const filtered = groups.filter((group) =>
      group.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGroups(filtered);
  }, [search, groups]);

  return (
    <Layout>
      <PageHeader
        title="Groups"
        description="Browse, search, and open your expense groups."
        actions={
          <Button onClick={() => setShowModal(true)} className="w-full sm:w-auto">
            <Plus size={16} />
            Create group
          </Button>
        }
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <label htmlFor="group-search" className="sr-only">Search groups</label>
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id="group-search"
            type="text"
            placeholder="Search groups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-muted/80 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-line bg-surface px-3.5 py-2 sm:self-auto">
          <span className="text-sm text-muted">Groups</span>
          <span className="text-sm font-semibold tabular-nums text-ink">{groups.length}</span>
        </div>
      </div>

      {loading ? (
        <Loading label="Loading groups" />
      ) : filteredGroups.length === 0 ? (
        <div className="section-card">
          <EmptyState
            icon={FolderKanban}
            title={groups.length === 0 ? "No groups yet" : "No groups found"}
            description={
              groups.length === 0
                ? "Create a group to start tracking shared expenses."
                : "Try another search keyword."
            }
            action={
              groups.length === 0 ? (
                <Button onClick={() => setShowModal(true)}>
                  <Plus size={16} />
                  Create group
                </Button>
              ) : null
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}

      {showModal && (
        <CreateGroupModal
          onClose={() => setShowModal(false)}
          onGroupCreated={loadGroups}
        />
      )}
    </Layout>
  );
}

export default Groups;
