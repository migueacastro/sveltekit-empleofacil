import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  url,
  locals: { safeGetSession }
}) => {
  const { session } = await safeGetSession();

  // if the user is already logged in return them to the account page
  if (session) {
    redirect(303, "/account");
  }

  return { url: url.origin };
};

export const actions: Actions = {
  default: async (event) => {
    const {
      url,
      request,
      locals: { supabase }
    } = event;
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const validPassword = password === confirmPassword;

    if (!validEmail) {
      return fail(400, {
        errors: { email: "Please enter a valid email address" },
        email
      });
    }
    if (!validPassword) {
      return fail(400, {
        errors: { password: "Passwords do not match" },
        password
      });
    }
    if (password.length < 8) {
      return fail(400, {
        errors: { password: "Password must be at least 8 characters" },
        password
      });
    }

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return fail(400, {
        success: false,
        email,
        message: `There was an issue, Please contact support.`
      });
    }

    await supabase.from("profiles").insert({
      id: event.locals?.user?.id,
      email,
      active : false,
      created_at: new Date(),
      updated_at: new Date()
    });

    return {
      success: true,
      message:
        "Please check your email for a magic link to log into the website."
    };
  }
};
