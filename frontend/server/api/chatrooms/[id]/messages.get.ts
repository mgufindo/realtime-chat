export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  
  try {
    const response = await $fetch(`${config.apiBase}/chatrooms/${id}/messages`)
    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch messages'
    })
  }
})