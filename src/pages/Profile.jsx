import { useEffect, useState } from "react";
import { Calendar, Mail, UserRound } from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import { formatDate, getInitials } from "../utils/format";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="My profile"
        description="View your account information."
      />

      {loading ? (
        <Loading label="Loading profile" />
      ) : !user ? (
        <div className="section-card p-6 text-sm text-muted" role="alert">
          Profile information is unavailable. Please try again later.
        </div>
      ) : (
        <div className="mx-auto max-w-2xl section-card p-6 md:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-2xl font-semibold text-white">
              {getInitials(user.name)}
            </div>
            <h2 className="mt-4 break-words text-xl font-semibold text-ink">{user.name}</h2>
            <p className="mt-1 break-all text-sm text-muted">{user.email}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-canvas p-4">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                <UserRound size={14} />
                Name
              </p>
              <p className="mt-1.5 break-words font-medium text-ink">{user.name}</p>
            </div>
            <div className="rounded-xl border border-line bg-canvas p-4">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                <Mail size={14} />
                Email
              </p>
              <p className="mt-1.5 break-all font-medium text-ink">{user.email}</p>
            </div>
            {user.createdAt && (
              <div className="rounded-xl border border-line bg-canvas p-4 md:col-span-2">
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                  <Calendar size={14} />
                  Member since
                </p>
                <p className="mt-1.5 font-medium text-ink">{formatDate(user.createdAt)}</p>
              </div>
            )}
          </div>

          <Button disabled className="mt-8 w-full" variant="secondary">
            Edit profile (Coming Soon)
          </Button>
        </div>
      )}
    </Layout>
  );
}

export default Profile;
