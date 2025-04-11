import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "../$types";

export const load: PageServerLoad = async ({
  locals: { supabase, profile }
}) => {
  if (profile.role_id === 3) {
    return redirect(303, "/private");
  }

  let { data: notifications } = await supabase
    .from("interactions")
    .select("*")
    .eq("to_user_id", profile.id)
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (!notifications) {
    return {
      notifications: []
    };
  }

  notifications = await Promise.all(
    notifications.map(async (notification) => {
      const { data: from_user } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", notification.from_user_id)
        .single();
      return {
        ...notification,
        from_user
      };
    })
  );

  await supabase
    .from("interactions")
    .update({
      read: true,
      updated_at: new Date()
    })
    .eq("to_user_id", profile.id);

  return {
    notifications
  };
};

export const actions: Actions = {
  remove: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const { error } = await supabase
      .from("interactions")
      .update({
        active: false,
        updated_at: new Date()
      })
      .eq("id", id);
    if (error) {
      return {
        error: "Error removing notification"
      };
    }
    return {
      success: true
    };
  }
};
