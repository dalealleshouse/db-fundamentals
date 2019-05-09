import http from 'http';
import express, {Response, Request} from 'express';
import repoFactory from './repos/RepoFactory';
import okrRouter from './OkrRouter'

const BASE_URL = '/api/okr';
const DEFAULT_PORT = 5000;
const port = process.env.PORT || DEFAULT_PORT;
const server = express();

server.use(BASE_URL, okrRouter);
http.createServer(server).listen(port, () => {
  console.log(`Running on port ${port}`);
});
