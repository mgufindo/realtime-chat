export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  try {
    // Forward the request to the Rails API
    console.log(`Posting to: ${config.apiBase}/messages with body:`, body);
    
    const response = await $fetch(`${config.apiBase}/messages`, {
      method: 'POST',
      body: body
    })
    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send message to API'
    })
  }
})