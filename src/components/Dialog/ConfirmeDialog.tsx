import type { ConfirmDialogProps } from "../../types/confirmDialogProps";

export const ConfirmDialog = ({ userId, onCancel }: ConfirmDialogProps) => {
  console.log({ userId });

  const handleDeteleUser = () => {
    alert(`User with ID ${userId} has been deleted.`);
  };

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
            onClick={handleDeteleUser}
            className="
              rounded-lg
              bg-red-600
              px-4 py-2
              text-sm font-medium
              text-white
              hover:bg-red-700
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
