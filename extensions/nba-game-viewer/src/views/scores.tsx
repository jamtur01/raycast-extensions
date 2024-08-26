import { getPreferenceValues, List } from "@raycast/api";
import useScores from "../hooks/useScores";
import DayComponent from "../components/Day";
import { useState } from "react";

const Scores = () => {
  const { league, useLastValue } = getPreferenceValues<Preferences>();
  const [selectedLeague, setSelectedLeague] = useState<string>(league); // Default to NBA
  const { data, isLoading } = useScores(selectedLeague);

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder={`${selectedLeague.toUpperCase()} Scores`}
      searchBarAccessory={
        <List.Dropdown tooltip="Select League" storeValue={useLastValue} onChange={setSelectedLeague}>
          <List.Dropdown.Section title="Leagues">
            <List.Dropdown.Item value="nba" title="NBA" />
            <List.Dropdown.Item value="wnba" title="WNBA" />
          </List.Dropdown.Section>
        </List.Dropdown>
      }
    >
      {data?.map((day) => <DayComponent key={day.date} day={day} />)}
    </List>
  );
};

export default Scores;
