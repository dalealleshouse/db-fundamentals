import express, {Response, Request} from 'express';
import repoFactory from './repos/RepoFactory';
import {Quarter} from './repos/RepoTypes';

const orkRouter = express.Router();
const repo = repoFactory();

orkRouter.get('/portfolios', async (req: Request, res: Response) => {
  return res.json(await repo.getPortfolios());
});

orkRouter.get('/objectives/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await repo.getObjectiveById(id);
  if (!result) res.status(404).send('Not Found');
  else res.json(result);
});

orkRouter.get(
  '/objectives/:portfolioId/:year/:quarter',
  async (req: Request, res: Response) => {
    const portfolioId = parseInt(req.params.portfolioId);
    const year = parseInt(req.params.year);
    const quarter = parseInt(req.params.quarter);
    return res.json(
      await repo.getObjectivesByPortfolio(
        portfolioId,
        year,
        quarter as Quarter,
      ),
    );
  },
);

export default orkRouter;
