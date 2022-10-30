export const api = {
  icon: '🚀',
  name: 'mysql.do',
  description: 'Cloudflare Worker Template',
  url: 'https://mysql.do/api',
  type: 'https://apis.do/database',
  endpoints: {
    listCategories: 'https://mysql.do/api',
    getCategory: 'https://mysql.do/:type',
  },
  site: 'https://mysql.do',
  login: 'https://mysql.do/login',
  signup: 'https://mysql.do/signup',
  subscribe: 'https://mysql.do/subscribe',
  repo: 'https://github.com/drivly/mysql.do',
}

export const gettingStarted = [
  `If you don't already have a JSON Viewer Browser Extension, get that first:`,
  `https://extensions.do`,
]

export const examples = {
  listItems: 'https://mysql.do/worker',
}

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())
    if (rootPath) return json({ api, gettingStarted, examples, user })
    
    // TODO: Implement this
    const [ resource, id ] = pathSegments
    const data = { resource, id, hello: user.city }
    
    return json({ api, data, user })
  }
}

const json = obj => new Response(JSON.stringify(obj, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
