import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
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
          {/* HEADER */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["First name", "Last name", "Email", "Country", "Role"].map(
                (h) => (
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
                )
              )}
            </tr>
          </thead>

          {/* BODY */}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
