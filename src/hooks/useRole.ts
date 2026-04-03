import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export const useRole = (user: User | null) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkedUserId = useRef<string | null>(null);

  // Keep loading true if user changed but we haven't checked yet
  const effectiveLoading = isLoading || (user?.id !== checkedUserId.current);

  useEffect(() => {
    if (!user) {
      checkedUserId.current = null;
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    const checkRole = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: user.id,
          _role: "admin",
        });

        if (error) {
          console.error("Error checking role:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }
      } catch {
        setIsAdmin(false);
      } finally {
        checkedUserId.current = user.id;
        setIsLoading(false);
      }
    };

    checkRole();
  }, [user]);

  return { isAdmin, isLoading: effectiveLoading };
};
