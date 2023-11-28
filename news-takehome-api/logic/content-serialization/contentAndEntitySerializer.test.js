const contentAndEntitySerializer = require("./contentAndEntitySerializer");

test("it ignores on no named entities", async () => {
  const output = contentAndEntitySerializer("some content", {});
  expect(output).toStrictEqual([{ content: "some content", type: "none" }]);
});

test("it works on single entity", async () => {
  const output = contentAndEntitySerializer("hi Alpri you are Alpri, hi", {
    people: ["Alpri"],
  });
  console.log(output);
  expect(output).toStrictEqual([
    {
      content: "hi ",
      type: "none",
    },
    {
      content: "Alpri",
      type: "people",
    },
    {
      content: " you are ",
      type: "none",
    },
    {
      content: "Alpri",
      type: "people",
    },
    {
      content: ", hi",
      type: "none",
    },
  ]);
});

test("it works repeated entity", async () => {
  const output = contentAndEntitySerializer("AlpriAlpri Alpri Alpri", {
    people: ["Alpri"],
  });
  console.log(output);
  expect(output).toStrictEqual([
    {
      content: "Alpri",
      type: "people",
    },
    {
      content: "Alpri",
      type: "people",
    },
    {
      content: " ",
      type: "none",
    },
    {
      content: "Alpri",
      type: "people",
    },
    {
      content: " ",
      type: "none",
    },
    {
      content: "Alpri",
      type: "people",
    },
  ]);
});

test("it works with multiple entities", async () => {
  const output = contentAndEntitySerializer("Drake sat at noon", {
    people: ["Drake"],
    time: ["noon"],
  });

  expect(output).toStrictEqual([
    {
      content: "Drake",
      type: "people",
    },
    {
      content: " sat at ",
      type: "none",
    },
    {
      content: "noon",
      type: "time",
    },
  ]);
});

const LARGE_CONTENT =
  "Lamar Jackson and the Ravens rolled past the Chargers on Sunday night. After forcing four turnovers on the night, the Baltimore Ravens held on to grab a big win at SoFi Stadium on Sunday night. The Ravens fended off Justin Herbert and the Los Angeles Chargers to grab the 20-10 win in Inglewood, California, in their “Sunday Night Football” matchup. The win marked the Ravens second straight and sixth in their last seven. They now sit at 9-3 and hold the best record in the AFC. The Chargers had a great opening drive down into the red zone, but it stalled after a late penalty forced them to kick a field goal. From there, the Ravens took off. Zay Flowers caught a 3-yard touchdown pass early in the second quarter, and hit a celebration that Jackson wasn’t a huge fan of for some reason. The Chargers then fumbled twice on back-to-back drives in the second quarter, which set up one final field goal for the Ravens to send them into the locker room up 10-3. Baltimore kicked a field goal on its opening drive of the second half, too, which gave it a 10-point lead. The Chargers mounted a great drive late in the third quarter, and seemed poised to cut the game to just three points in the early minutes of the final period. They even used a wild two-pass play midway through the drive. Yet the Ravens swallowed Herbert up in the pocket and forced their fourth turnover of the night to get the ball right back. The 19-play drive resulted in zero points. The Chargers finally scored a touchdown midway through the fourth quarter on a short Gerald Everett catch, which brought them within three points. That was set up after a huge 35-yard run from Herbert. While Justin Tucker missed a field goal that would have put them up by six, the Ravens stopped the Chargers one last time to get the ball back. Flowers then scored a second time on a 37 yard run to seal the 10-point win. Herbert went 29-of-44 for 217 yards with a touchdown and an interception in the loss for the Chargers. He was also their leading rusher with 47 yards. Keenan Allen had 106 yards on 14 catches. The Chargers are now just 4-7 on the season. Lamar Jackson went 18-of-32 for 177 yards and a touchdown in the win for Baltimore. Keaton Mitchell was led the Ravens on the ground with 64 yards on nine carries, and Isaiah Likely had 40 receiving yards on four catches.";
const MANY_NAMED_ENTITIES = {
  people: [
    "Lamar Jackson",
    "Justin Herbert",
    "Zay Flowers",
    "Gerald Everett",
    "Justin Tucker",
    "Keaton Mitchell",
    "Isaiah Likely",
  ],
  locations: ["SoFi Stadium", "Inglewood, California", "AFC"],
  organizations: ["Baltimore Ravens"],
  time: [
    "Sunday night",
    "second quarter",
    "second half",
    "third quarter",
    "fourth quarter",
    "last seven",
    "midway",
  ],
};

test("smoke test", async () => {
  const output = contentAndEntitySerializer(LARGE_CONTENT, MANY_NAMED_ENTITIES);
  console.log(output);
  expect(output).toStrictEqual([
    { content: "Lamar Jackson", type: "people" },
    {
      content: " and the Ravens rolled past the Chargers on ",
      type: "none",
    },
    { content: "Sunday night", type: "time" },
    {
      content: ". After forcing four turnovers on the night, the ",
      type: "none",
    },
    { content: "Baltimore Ravens", type: "organizations" },
    { content: " held on to grab a big win at ", type: "none" },
    { content: "SoFi Stadium", type: "locations" },
    { content: " on ", type: "none" },
    { content: "Sunday night", type: "time" },
    { content: ". The Ravens fended off ", type: "none" },
    { content: "Justin Herbert", type: "people" },
    {
      content: " and the Los Angeles Chargers to grab the 20-10 win in ",
      type: "none",
    },
    { content: "Inglewood, California", type: "locations" },
    {
      content:
        ", in their “Sunday Night Football” matchup. The win marked the Ravens second straight and sixth in their ",
      type: "none",
    },
    { content: "last seven", type: "time" },
    {
      content: ". They now sit at 9-3 and hold the best record in the ",
      type: "none",
    },
    { content: "AFC", type: "locations" },
    {
      content:
        ". The Chargers had a great opening drive down into the red zone, but it stalled after a late penalty forced them to kick a field goal. From there, the Ravens took off. ",
      type: "none",
    },
    { content: "Zay Flowers", type: "people" },
    {
      content: " caught a 3-yard touchdown pass early in the ",
      type: "none",
    },
    { content: "second quarter", type: "time" },
    {
      content:
        ", and hit a celebration that Jackson wasn’t a huge fan of for some reason. The Chargers then fumbled twice on back-to-back drives in the ",
      type: "none",
    },
    { content: "second quarter", type: "time" },
    {
      content:
        ", which set up one final field goal for the Ravens to send them into the locker room up 10-3. Baltimore kicked a field goal on its opening drive of the ",
      type: "none",
    },
    { content: "second half", type: "time" },
    {
      content:
        ", too, which gave it a 10-point lead. The Chargers mounted a great drive late in the ",
      type: "none",
    },
    { content: "third quarter", type: "time" },
    {
      content:
        ", and seemed poised to cut the game to just three points in the early minutes of the final period. They even used a wild two-pass play ",
      type: "none",
    },
    { content: "midway", type: "time" },
    {
      content:
        " through the drive. Yet the Ravens swallowed Herbert up in the pocket and forced their fourth turnover of the night to get the ball right back. The 19-play drive resulted in zero points. The Chargers finally scored a touchdown ",
      type: "none",
    },
    { content: "midway", type: "time" },
    { content: " through the ", type: "none" },
    { content: "fourth quarter", type: "time" },
    { content: " on a short ", type: "none" },
    { content: "Gerald Everett", type: "people" },
    {
      content:
        " catch, which brought them within three points. That was set up after a huge 35-yard run from Herbert. While ",
      type: "none",
    },
    { content: "Justin Tucker", type: "people" },
    {
      content:
        " missed a field goal that would have put them up by six, the Ravens stopped the Chargers one last time to get the ball back. Flowers then scored a second time on a 37 yard run to seal the 10-point win. Herbert went 29-of-44 for 217 yards with a touchdown and an interception in the loss for the Chargers. He was also their leading rusher with 47 yards. Keenan Allen had 106 yards on 14 catches. The Chargers are now just 4-7 on the season. ",
      type: "none",
    },
    { content: "Lamar Jackson", type: "people" },
    {
      content:
        " went 18-of-32 for 177 yards and a touchdown in the win for Baltimore. ",
      type: "none",
    },
    { content: "Keaton Mitchell", type: "people" },
    {
      content:
        " was led the Ravens on the ground with 64 yards on nine carries, and ",
      type: "none",
    },
    { content: "Isaiah Likely", type: "people" },
    { content: " had 40 receiving yards on four catches.", type: "none" },
  ]);
});
