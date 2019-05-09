export type Maybe<T> = T | null;
export type Quarter = 1 | 2 | 3 | 4;

export type Portfolio = {
  id: number;
  name: string;
  abbreviation: string;
};

export type KeyResult = {
  id: number;
  objective_id: number;
  objective: Objective;
  result: number;
  percent_achieved: number;
};

export type Objective = {
  id: number;
  portfolio: Portfolio;
  year: number;
  quarter: number;
  objective: string;
  key_results: Array<KeyResult>;
};

export type OkrRepo = {
  getPortfolios: () => Promise<Array<Portfolio>>;
  getObjectiveById: (id: number) => Promise<Maybe<Objective>>;
  getObjectivesByPortfolio: (
    portfolioId: number,
    year: number,
    quarter: Quarter,
  ) => Promise<Array<Objective>>;
};

export enum RepoType {
  POSTGRES = 1,
  MONGO = 2,
}
