export async function load({ locals}) {
  console.log(locals.profile)
  const profile = locals.profile;
  return { profile };
}