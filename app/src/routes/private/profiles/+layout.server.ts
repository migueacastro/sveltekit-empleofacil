import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad= async ({locals}) => {
    if (locals.profile.role_id === 2) {
        return redirect(303, "/private/");
    }
};