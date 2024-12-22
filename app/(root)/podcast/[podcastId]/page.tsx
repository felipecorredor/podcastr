import React from "react";

interface PodcastDetailsParams {
  params: {
    podcastId: string;
  };
}

const PodcastDetails = ({ params }: PodcastDetailsParams) => {
  const podcastId = params.podcastId || "no-podcast-id";

  return <p className="">PodcastDetails for {podcastId}</p>;
};

export default PodcastDetails;
