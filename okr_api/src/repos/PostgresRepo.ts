import {OkrRepo, Objective, Maybe, Portfolio, KeyResult} from './RepoTypes';
import {Pool} from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASS,
  port: parseInt(process.env.POSTGRES_PORT as string),
});

const repo: OkrRepo = {
  getPortfolios: async function() {
    const result = await pool.query('SELECT * FROM portfolios;');

    return result.rows;
  },
  getObjectiveById: async function(id) {
    const result = await pool.query(
      'SELECT id, objective FROM objectives WHERE id = $1',
      [id],
    );

    return result.rowCount == 0 ? null : result.rows[0];
  },
  getObjectivesByPortfolio: async function(portfolioId, year, quarter) {
    const results = await Promise.all([
      pool.query(`SELECT * FROM portfolios WHERE id = $1`, [portfolioId]),
      pool.query(
        `SELECT kr.* 
      FROM key_results AS kr
        INNER JOIN objectives as o ON o.id = kr.objective_id
      WHERE o.portfolio_id = $1
        AND o.year = $2
        AND o.quarter = $3`,
        [portfolioId, year, quarter],
      ),
      pool.query(
        `SELECT * FROM objectives
      WHERE portfolio_Id = $1
        AND year = $2
        AND quarter = $3`,
        [portfolioId, year, quarter],
      ),
    ]);

    const portfolio: Array<Portfolio> = results[0].rows;
    const keyResults: Array<KeyResult> = results[1].rows;
    const objectives: Array<Objective> = results[2].rows;

    return objectives
      .map(o => ({...o, portfolio: portfolio[0]}))
      .map(o => ({
        ...o,
        key_results: keyResults.filter(kr => kr.objective_id === o.id),
      })) as Array<Objective>;
  },
};

export default repo;
