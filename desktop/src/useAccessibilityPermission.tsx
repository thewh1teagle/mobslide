import { invoke } from "@tauri-apps/api/core";
import * as os from "@tauri-apps/plugin-os";
import { useEffect, useRef, useState } from "react";

export function useAccessibiltyPermission() {
  const [isAllowed, setIsAllowed] = useState(true);
  const isAllowedOnce = useRef<boolean>();
  const intervalIdRef = useRef<number>();

  async function checkPermission(showPrompt = true) {
    const platform = await os.platform();
    if (platform === "macos") {
      const isAllowed = await await invoke("check_accessibility_permission");
      if (isAllowed) {
        isAllowedOnce.current = true;
        clearInterval(intervalIdRef.current);
      } else if (showPrompt) {
        invoke("open_accessibility_permission");
      }
      setIsAllowed(isAllowed as boolean);
    }
  }

  async function init() {
    const platform = await os.platform();

    // update permission state every 1 sec without prompt
    if (platform === "macos") {
      checkPermission(false);
      intervalIdRef.current = setInterval(
        async () => checkPermission(false),
        1000
      );
    }
  }

  useEffect(() => {
    init();
    return () => clearInterval(intervalIdRef.current);
  }, []);

  return { isAllowed, checkPermission };
}
