import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, FolderKanban, UserRound } from "lucide-react";
import Button from "./ui/Button";
import { formatDate } from "../utils/format";

function GroupCard({ group }) {
  const navigate = useNavigate();

  return (
    <article className="section-card flex h-full flex-col p-5 transition-colors hover:border-brand/25">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand" aria-hidden="true">
          <FolderKanban size={19} strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <h2 className="break-words text-base font-semibold text-ink" title={group.name}>
            {group.name}
          </h2>
          <p className="text-sm text-muted">Expense group</p>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-sm text-ink">
        <p className="flex min-w-0 items-center gap-2">
          <UserRound size={16} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="shrink-0 text-muted">Created by</span>
          <span className="break-words font-medium" title={group.createdBy.name}>
            {group.createdBy.name}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={16} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="shrink-0 text-muted">Created</span>
          <span className="font-medium tabular-nums">{formatDate(group.createdAt)}</span>
        </p>
      </div>

      <Button
        className="mt-6 w-full"
        onClick={() => navigate(`/groups/${group.id}`)}
      >
        Open group
        <ArrowRight size={16} />
      </Button>
    </article>
  );
}

export default GroupCard;
