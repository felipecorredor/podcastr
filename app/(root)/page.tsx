import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold">Trending Podcasts</h1>
        <div className="podcast_grid">
          {podcastData.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>

        <main className="podcast_grid min-h-screen flex-col items-center justify-between p-24"></main>
      </section>
    </div>
  );
};

export default Home;
