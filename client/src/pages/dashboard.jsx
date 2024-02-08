import React from "react";
import { useQuery, gql } from "@apollo/client";

const Dashboard = () => {
  return (
    <main>
      {/*Maybe header here with the display name, TODO: abstract header into a 
    component then import said component within the pages*/}
      <ul>
        {/*fetch the data here, map it with it's id*/}
        {/*data.map(({ id }) => (
        <li key={id} >  </li>
      ))*/}
      </ul>
    </main>
  );
};
