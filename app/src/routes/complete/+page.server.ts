import { redirect, fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

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

export const actions: Actions = {
  default: async ({
    request,
    locals: { supabase, safeGetSession, profile },
    url
  }) => {
    const { session, user } = await safeGetSession();
    const formData = await request.formData();
    const full_name = formData.get("full_name") as string;
    const email = user?.email as string;
    const description = formData.get("description") as string;
    const job_id = formData.get("job_id") as string;
    const region_id = formData.get("region_id") as string;
    const corporation_name = formData.get("corporation_name") as string;
    const role_id = formData.get("role_id") as string;
    const experience = formData.get("experience") as string;

    if (full_name.length < 3) {
      return fail(400, {
        errors: { full_name: "El nombre debe tener al menos 3 caracteres." },
        full_name
      });
    }

    if (role_id === "3") {
      if (corporation_name.length < 3) {
        return fail(400, {
          errors: {
            corporation_name:
              "El nombre de la corporación debe tener al menos 3 caracteres."
          },
          corporation_name
        });
      }
    } else {
      if (description.length < 3) {
        return fail(400, {
          errors: {
            description: "La descripción debe tener al menos 3 caracteres."
          },
          description
        });
      }
      if (experience.length < 3) {
        return fail(400, {
          errors: {
            experience: "La experiencia debe tener al menos 3 caracteres."
          },
          experience
        });
      }
    }

    const corporate_data = {
      id: session?.user.id,
      full_name,
      email,
      region_id,
      corporation_name,
      role_id,
      updated_at: new Date(),
      active: true
    };
    const employee_data = {
      id: session?.user.id,
      full_name,
      email,
      description,
      job_id,
      region_id,
      role_id,
      experience,
      updated_at: new Date(),
      active: true
    };

    const { error } = await supabase
      .from("profiles")
      .upsert(role_id === "3" ? corporate_data : employee_data);

    if (error) {
      return fail(500, {
        full_name,
        email,
        description,
        job_id,
        region_id,
        corporation_name,
        role_id,
        experience,
        active: true,
        error: "There was an issue, Please contact support."
      });
    }

    profile = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user.id)
      .single();
    return redirect(303, "/");
  }
};
