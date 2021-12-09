import FiAnaliser from "../fi-analiser";
import { fi } from "../fi-dummy";

it("logs fi", async () => {
  const fiAnaliser = new FiAnaliser();

  console.log(fi);

  const fiSt = await fiAnaliser.analyseFi(fi);

  console.log(JSON.stringify(fiSt));
});
