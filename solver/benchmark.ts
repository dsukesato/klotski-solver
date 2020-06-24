import Board from './types/Board';
import { BFS } from './BFS';
import stats from 'stats-lite';
import { questions } from './sample-data';
const table = require('console.table');

//settings
const BENCH_TIMES = 5;

//utils
const benchmarkQuestion = (
  board: Board,
  times: number
): { avg: number; stdev: number } => {
  let take_times: number[] = [];
  for (let i = 0; i < times; i++) {
    const start_time = new Date();

    BFS(board);

    const take_time = new Date().getTime() - start_time.getTime();
    take_times.push(take_time);
  }

  return { avg: stats.mean(take_times), stdev: stats.stdev(take_times) };
};

//main
const main = () => {
  console.log(`Benchmarking for each question ${BENCH_TIMES} times...\n`);

  const result: {
    name: string;
    avg: string;
    stdev: string;
  }[] = [];
  for (const [name, value] of Object.entries(questions)) {
    const bench_result = benchmarkQuestion(value, BENCH_TIMES);
    result.push({
      name,
      avg: bench_result.avg.toString(),
      stdev: bench_result.stdev.toString(),
    });
  }

  console.table(result);
};
main();
