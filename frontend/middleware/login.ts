export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig();
  const token = useCookie(config.public.token);

  if (token.value) {
    return navigateTo("/dashboard");
  }
});
