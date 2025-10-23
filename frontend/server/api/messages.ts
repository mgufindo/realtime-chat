export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    // Forward the request to the Rails API

    const response = await $fetch(`${config.apiBase}/messages`)
    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch messages from API'
    })
  }
})