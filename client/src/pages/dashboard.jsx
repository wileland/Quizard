import React from "react";
import { useQuery, gql } from "@apollo/client";
import { QUERY_QUIZZES } from "../utils/queries";

const Dashboard = () => {
  const { loading, error, data } = useQuery(QUERY_QUIZZES);

  return (
    <main>
      {/*Maybe header here with the display name, TODO: abstract header into a 
    component then import said component within the pages*/}
      <ul>
        {/*fetch the data here, map it with it's id*/}
        {data.quizzes.map(({ _id }) => (
          <li key={_id}></li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
