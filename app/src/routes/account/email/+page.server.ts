import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const { data: regions, error } = await locals.supabase
    .from("regions")
    .select("*")
    .eq("active", true);
  const { data: jobs } = await locals.supabase
    .from("jobs")
    .select("*")
    .eq("active", true);
  if (error) {
    console.error("Error fetching regions:", error);
    throw new Error("Failed to load regions");
  }

  return {
    regions,
    jobs
  };
}

export const actions = {
  default: async ({
    request,
    locals: { supabase, safeGetSession, profile },
    url
  }) => {
    const { session, user } = await safeGetSession();
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email);

    if (!validEmail) {
      return fail(400, {
        errors: { email: "Please enter a valid email address" },
        email
      });
    }
    const { error } = await supabase.auth.updateUser({
      email
    });
    if (error) {
      return fail(400, {
        success: false,
        email,
        message: `There was an issue, Please contact support.`
      });
    }

    await supabase.from("profiles").upsert({
      id: session?.user.id,

      email,
      updated_at: new Date(),
      active: true
    });

    if (error) {
      return fail(500, {
        email,
        active: true,
        error: "There was an issue, Please contact support."
      });
    }


    profile = {
      ...profile,
      email,
      active: true
    };

    return redirect(303, "/account");
  }
};
