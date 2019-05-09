import {OkrRepo} from './RepoTypes';
import PostgresRepo from './PostgresRepo';

export default function repoFactory(): OkrRepo {
  return PostgresRepo;
}
