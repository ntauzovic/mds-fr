import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ConfirmDialogProps } from "../../types/confirmDialogProps";
import { deleteUser } from "../../services/api/users";
import toast from "react-hot-toast";
import { useLanguage } from "../../hooks/useLanguage";

export const ConfirmDialog = ({ userId, onCancel }: ConfirmDialogProps) => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success(t("toast.user.delete.success"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (onCancel) {
        onCancel();
      }
    },
    onError: () => {
      toast.error(t("toast.user.delete.error"));
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            ⚠️
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t("dialog.delete.title")}
          </h3>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          {t("dialog.delete.confirmation")}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              rounded-lg
              px-4 py-2
              text-sm font-medium
              text-gray-700
              bg-gray-100
            "
          >
            {t("dialog.cancel.btn")}
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
            {t("dialog.delete.btn")}
          </button>
        </div>
      </div>
    </div>
  );
};
