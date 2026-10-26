import { Users } from "lucide-react";
import Button from "./ui/Button";
import EmptyState from "./ui/EmptyState";

function MemberTable({
  members,
  onAddMember,
  onRemoveMember,
  isCreator,
  creatorId,
}) {
  return (
    <section className="section-card mt-6 overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-line px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h2 className="text-base font-semibold text-ink">
            Members ({members.length})
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            People included in this group's expenses.
          </p>
        </div>
        {isCreator && (
          <Button onClick={onAddMember} className="w-full md:w-auto">
            Add member
          </Button>
        )}
      </div>

      {members.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No members yet"
          description="Add people so expenses can be split."
        />
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <thead className="table-head">
                <tr>
                  <th className="table-cell">Name</th>
                  <th className="table-cell">Email</th>
                  {isCreator && <th className="table-cell">Action</th>}
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-t border-line">
                    <td className="table-cell font-medium">{member.userName}</td>
                    <td className="table-cell text-muted">{member.userEmail}</td>
                    {isCreator && (
                      <td className="table-cell">
                        {member.userId === creatorId ? (
                          <span className="rounded-lg bg-brand-soft px-2 py-1 text-xs font-medium text-brand">
                            Creator
                          </span>
                        ) : (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onRemoveMember(member.userId)}
                          >
                            Remove
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {members.map((member) => (
              <div key={member.id} className="rounded-xl border border-line p-4">
                <h3 className="font-semibold text-ink">{member.userName}</h3>
                <p className="mt-1 break-all text-sm text-muted">{member.userEmail}</p>
                {isCreator && (
                  <div className="mt-4">
                    {member.userId === creatorId ? (
                      <span className="rounded-lg bg-brand-soft px-2 py-1 text-xs font-medium text-brand">
                        Creator
                      </span>
                    ) : (
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => onRemoveMember(member.userId)}
                      >
                        Remove member
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default MemberTable;
