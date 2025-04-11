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

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    if (password.length < 6) {
      return fail(400, {
        errors: { password: "La contraseña debe tener al menos 6 caractéres." },
        password
      });
    }
    if (password !== confirmPassword) {
      return fail(400, {
        errors: { password: "Las contraseñas no coinciden." },
        password
      });
    }

    const { error } = await supabase.auth.updateUser({
      password
    });
    if (error) {
      return fail(400, {
        success: false,
        password,
        message: `Hubo un problema. Contacte al soporte técnico.`
      });
    }

    return redirect(303, "/account");
  }
};
