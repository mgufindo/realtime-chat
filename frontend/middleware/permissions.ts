export default defineNuxtRouteMiddleware((to, from) => {
  
  const permissions: any = useCookie("permissions").value;
  const permission = to.meta.permission as string
  const redirect = to.meta.redirect_url as string
  const user: any = useCookie('user');
  
  if ((!permission && !permissions.includes(permission)) && (user.value.role_name !== 'super_admin')) {
    return navigateTo(redirect ? redirect : '/dashboard');
  }

});
