import React from "react";
import type { User } from "../../types/user";
import { ConfirmDialog } from "../Dialog/ConfirmeDialog";

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    null
  );

  const openConfirmDialog = (userId: number) => {
    setSelectedUserId(userId);
    setShowDialog(true);
  };

  return (
    <div
      className="
    overflow-hidden
    rounded-2xl
    bg-white
    shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]
    border border-gray-100
  "
    >
      <div className="overflow-x-auto">
        <table className=" w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "First name",
                "Last name",
                "Email",
                "Country",
                "Role",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="
                      px-6 py-4
                      text-left text-xs
                      font-semibold uppercase tracking-wide
                      text-gray-600
                    "
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr className="transition-colors hover:bg-sky-50/70">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.firstName}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.country?.name ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.role?.name ?? "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <button
                    onClick={() => openConfirmDialog(user.id)}
                    className="
                      rounded-lg
                      bg-red-600 w-[70px] h-[30px]
                      text-sm font-medium
                      text-white
                      hover:bg-red-700
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                    "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDialog && selectedUserId !== null && (
        <ConfirmDialog
          userId={selectedUserId}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}
