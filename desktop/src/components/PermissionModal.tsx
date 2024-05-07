import { cx } from "../lib/utils";

interface PermissionModalProps {
  allowed: boolean;
  checkPermission: (showPrompt: boolean) => void;
}
export default function PermissionModal({
  allowed: granted,
  checkPermission,
}: PermissionModalProps) {
  return (
    <dialog className={cx("modal", !granted && "modal-open")}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Accessibility</h3>
        <p className="py-4">
          Mobslide app lets you use your phone as a remote for presentations.
          Just grant accessibility permission.
        </p>
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={() => checkPermission(true)}
          >
            Continue
          </button>
        </div>
      </div>
    </dialog>
  );
}
