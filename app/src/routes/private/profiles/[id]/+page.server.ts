import type { PageServerLoad } from "./$types";


export const load: PageServerLoad= async ({params, locals: { supabase, profile}}) => {
    let { data: profileview, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();
    if (error) {
        return {
            error: "User not found",
        }
    }



    let { data: job } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", profileview.job_id)
        .single();

    const { data: job_category } = await supabase
        .from("job_categories")
        .select("*")
        .eq("id", job.category_id)
        .single();

    job = {
        ...job,
        category: job_category,
    } 
    const { data: region } = await supabase
        .from("regions")
        .select("*")
        .eq("id", profileview.region_id)
        .single();


    if (profile.role_id === 3) {
        await supabase
            .from("interactions")
            .insert({
                to_user_id: profileview.id,
                from_user_id: profile.id,
                type: "interest",
                active: true,
                read: false,
                created_at: new Date(),
                updated_at: new Date(),
            });
    } 

    profileview = {
        ...profileview,
        job: job,
        region: region,
    }
    return {
        profileview,
    }
};