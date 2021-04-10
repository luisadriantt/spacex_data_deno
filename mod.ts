import * as log from "https://deno.land/std@0.92.0/log/mod.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface LaunchInterface {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: Array<string>;
}

const launches = new Map<number, LaunchInterface>();

export const launchData = async () => {
  log.info("Downloading launch data");
  try {
    const response = await fetch("https://api.spacexdata.com/v3/launches");
    const data = await response.json();
    const reducedData = data.slice(0, 10);

    for (const launch of reducedData) {
      const payloads = launch["rocket"]["second_stage"]["payloads"];
      const customers = _.flatMap(
        payloads,
        (payload: Record<string, unknown>) => {
          return payload["customers"];
        }
      );

      const flightData: LaunchInterface = {
        flightNumber: launch["flight_number"],
        mission: launch["mission_name"],
        rocket: launch["rocket"]["rocket_name"],
        customers: customers,
      };

      launches.set(flightData.flightNumber, flightData);

      log.info(JSON.stringify(flightData));
    }
  } catch (error) {
    log.warning(error.message);
  }

  // Only runs if not imported in other file
  if (import.meta.main) {
    console.log(JSON.stringify(import.meta));
    console.log(`downloaded data for ${launches.size} SpaceX launches`);
  }
};
launchData();
