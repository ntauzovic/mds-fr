import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ConfirmDialogProps } from "../../types/confirmDialogProps";
import { deleteUser } from "../../services/api/users";
import toast from "react-hot-toast";

export const ConfirmDialog = ({ userId, onCancel }: ConfirmDialogProps) => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User delete successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (onCancel) {
        onCancel();
      }
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            ⚠️
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delete user</h3>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              rounded-lg
              px-4 py-2
              text-sm font-medium
              text-gray-700
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={() => deleteUserMutation.mutate(userId)}
            disabled={deleteUserMutation.isPending}
            className="
              rounded-lg
              bg-red-600
              px-4 py-2
              text-sm font-medium
              text-white
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
