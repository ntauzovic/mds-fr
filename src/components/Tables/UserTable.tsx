import React from "react";
import type { User } from "../../types/user";
import { ConfirmDialog } from "../Dialogs/ConfirmeDialog";
import { useLanguage } from "../../hooks/useLanguage";
import { USER_TABLE_HEADERS } from "../../constants/tableHeaders";

interface UserTableProps {
  users?: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const { t } = useLanguage();

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
              {USER_TABLE_HEADERS.map((key) => (
                <th
                  key={key}
                  className="
          px-6 py-4
          text-left text-xs
          font-semibold uppercase tracking-wide
          text-gray-600
        "
                >
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {!users || users.length === 0 ? (
              <tr>
                <td
                  colSpan={USER_TABLE_HEADERS.length}
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-semibold text-gray-700">
                      {t("table.noData.header")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t("table.noData.text")}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-sky-50/70"
                >
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
                  <td className="px-0.5 py-3 text-sm text-gray-700">
                    <button
                      onClick={() => openConfirmDialog(user.id)}
                      className="
              rounded-lg
              bg-red-600 w-[120px] h-[30px]
              text-sm font-medium
              text-white
              hover:bg-red-700
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            "
                    >
                      {t("table.delete.btn")}
                    </button>
                  </td>
                </tr>
              ))
            )}
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
