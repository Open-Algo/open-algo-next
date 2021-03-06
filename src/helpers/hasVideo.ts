import { Problem } from '../../types';

export default function hasVideo({ problem }: { problem: Problem }) {
  return Boolean(problem.videos && problem.videos.length > 0);
}
