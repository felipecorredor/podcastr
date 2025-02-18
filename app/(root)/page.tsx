import PodcastCard from "@/components/PodcastCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold">Trending Podcasts</h1>
        <div className="podcast_grid">
          {trendingPodcasts?.map((podcast) => (
            <PodcastCard key={podcast._id} podcast={podcast} />
          ))}
        </div>

        <main className="podcast_grid min-h-screen flex-col items-center justify-between p-24"></main>
      </section>
    </div>
  );
};

export default Home;
