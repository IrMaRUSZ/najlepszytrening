export interface ProfileForRanking {
    id: string;
    username: string;
    total_points: number;
    rank: string;
    team: string | null;
}