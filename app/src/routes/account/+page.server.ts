import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    signout: async ({ locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession();
        if (session) {
            await supabase.auth.signOut();
            redirect(303, "/");
        }
    },
    change_status: async ({
        request,
        locals: { supabase, safeGetSession, profile },
        url
    }) => {
        const { session } = await safeGetSession();

        const newStatus =
            profile.status === "unemployed" ? "employed" : "unemployed";
        const { error } = await supabase
            .from("profiles")
            .update({
                status: newStatus,
                updated_at: new Date()
            })
            .eq("id", session?.user.id)
            .single();

        if (error) {
            console.error("Error updating profile:", error);
            return {
                status: profile.status,
                error: "Failed to update status"
            };
        }

        profile.status = newStatus;
        return {
            status: newStatus
        };
    }
};
