import { Calendar, Mail, UserRound } from "lucide-react";
import Button from "./ui/Button";
import { formatDate } from "../utils/format";

function GroupInfo({
  group,
  isCreator,
  onDeleteGroup,
  deletingGroup,
}) {
  return (
    <div className="section-card p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-semibold tracking-tight text-ink">
            {group.name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage members, expenses, balances, and settlements for this group.
          </p>
        </div>

        {isCreator && (
          <Button
            variant="destructive"
            onClick={onDeleteGroup}
            disabled={deletingGroup}
            className="w-full md:w-auto"
          >
            {deletingGroup ? "Deleting..." : "Delete group"}
          </Button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-line bg-canvas p-4">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            <UserRound size={14} />
            Created by
          </p>
          <p className="mt-1.5 font-medium text-ink">{group.createdBy.name}</p>
        </div>
        <div className="rounded-xl border border-line bg-canvas p-4">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            <Mail size={14} />
            Email
          </p>
          <p className="mt-1.5 break-all font-medium text-ink">
            {group.createdBy.email}
          </p>
        </div>
        <div className="rounded-xl border border-line bg-canvas p-4">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            <Calendar size={14} />
            Created on
          </p>
          <p className="mt-1.5 font-medium text-ink">
            {formatDate(group.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GroupInfo;
