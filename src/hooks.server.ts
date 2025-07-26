// hooks.server.js
export async function handle({ event, resolve }) {
  // Forward cookies to your auth server
  const response = await resolve(event)
  return response
}