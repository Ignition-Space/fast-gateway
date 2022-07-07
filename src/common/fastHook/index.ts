/*
 * @Author: Cookie
 * @Description: 
 */

export const fastHook = (fastify: any) => {
  fastify.addHook('onError', async (request, reply, error) => {
    console.log(request, reply, error)
    // Useful for custom error logging
    // You should not use this hook to update the error
  })
}
