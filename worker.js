import { connect } from '@planetscale/database'

export const api = {
  icon: '🚀',
  name: 'mysql.do',
  description: 'MySQL Worker Proxy',
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

let config, conn = undefined

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())
    
    
    if (!config) {
      config = {
        host: env.DATABASE_HOST,
        username: env.DATABASE_USERNAME,
        password: env.DATABASE_PASSWORD
      }
    }
    
    if (!conn) conn = connect(config)
    
    const results = await conn.execute('select 1 from dual where 1=?', [1])
    
    if (rootPath) return json({ api, gettingStarted, examples, results, user })

    // TODO: Implement this
    const [ resource, id ] = pathSegments
    const data = { resource, id, hello: user.city }
    
    return json({ api, data, results, user })
  }
}

const json = obj => new Response(JSON.stringify(obj, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
