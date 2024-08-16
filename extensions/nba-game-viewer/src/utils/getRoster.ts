import axios from "axios";

type GetRosterArgs = {
  league: string;
  id: number;
};

const getRoster = async ({ league, id }: GetRosterArgs) => {
  if (!league || typeof league !== "string") {
    throw new Error("Invalid league specified.");
  }

  const baseUrl = `http://site.api.espn.com/apis/site/v2/sports/basketball/${league}/teams/${id}`;
  const params = {
    enable: "roster",
  };

  try {
    const res = await axios.get(baseUrl, { params });
    return res.data.team.athletes;
  } catch (error) {
    console.error(`Error fetching roster for ${league.toUpperCase()} team ${id}:`, error);
    throw error;
  }
};

export default getRoster;
