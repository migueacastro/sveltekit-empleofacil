import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase} }) => {
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("active", true)
    .eq("role_id", 2)
    .eq("status", "unemployed")

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("active", true);

  const { data: job_categories } = await supabase
    .from("job_categories")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  const { data: regions } = await supabase
    .from("regions")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  const jobObjects = jobs?.map((job) => {
    return {
      ...job,
      category: job_categories?.find(
        (category) => category.id === job.category_id
      )
    };
  });

  const profileObjects = profiles?.map((profile) => {
    return {
      ...profile,
      job: jobObjects?.find((job) => job.id === profile.job_id),
      region: regions?.find((region) => region.id === profile.region_id)
    };
  });
  return {
    profiles: profileObjects,
    jobs: jobObjects,
    job_categories: job_categories
  };
};
