"use client";

import { Database } from "../../../types/database.types";
import { createContext, ReactNode, useContext, useState } from "react";
import { createClient } from "../../../utils/supabase-browser";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext>(null!);

const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [supabase] = useState(() => createClient());

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
};

export const useSupabase = () => useContext(Context);

export default SupabaseProvider;
