export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  
  console.log(`🗑️ Nuxt API: Deleting chatroom ${id}`)
  
  try {
    const response = await $fetch(`${config.apiBase}/chatrooms/${id}`, {
      method: 'DELETE'
    })

    console.log(`🗑️ Nuxt API: Chatroom ${id} deletion response:`, response);
    
    
    console.log('✅ Nuxt API: Chatroom deleted successfully')
    return response
  } catch (error: any) {
    console.error('❌ Nuxt API: Failed to delete chatroom', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: 'Failed to delete chatroom'
    })
  }
})