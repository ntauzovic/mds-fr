/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./services/api/users";
import { getQueryParam } from "./hooks/getQueryParams";
import type { User } from "./types/user";

export default function App() {
  const page = getQueryParam("page", 1);
  const limit = getQueryParam("limit", 20);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers(page, limit),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;
  if (!data) return null;

  return (
    <div style={{ padding: 24 }}>
      <h1>Users</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={th}>First name</th>
            <th style={th}>Last name</th>
            <th style={th}>Email</th>
            <th style={th}>Country</th>
            <th style={th}>Role</th>
          </tr>
        </thead>

        <tbody>
          {data.data.map((user: User) => (
            <tr key={user.id}>
              <td style={td}>{user.firstName}</td>
              <td style={td}>{user.lastName}</td>
              <td style={td}>{user.email}</td>
              <td style={td}>{user.country?.name ?? "-"}</td>
              <td style={td}>{user.role?.name ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  background: "#f5f5f5",
};

const td: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
};
