const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db/db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
// Use '/api' prefix
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

server.use(auth);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
