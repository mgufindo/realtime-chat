export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  try {
    const response = await $fetch(`${config.apiBase}/chatrooms`, {
      method: 'POST',
      body: body
    })
    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create chatroom'
    })
  }
})