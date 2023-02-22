import getCompletion from "../functions/getCompletion.js";

const pointsProvider = (req, res) => {
  const topic = req.body.topic;
  const pointsCount = req.body.count;
  console.log(topic, pointsCount);

  // req validators

  if (!(topic && pointsCount)) {
    console.log("details missing");
    res.status(406).send("details_missing");
    return;
  }

  if (topic.length > 31) {
    console.log("unregistered topics length exceeded");
    res.status(406).send("unregisted_topic_length_exceeded");
    return;
  }

  if (pointsCount > 11) {
    console.log("unregistered points count exceeded");
    res.status(406).send("unregisted_points_count_exceeded");
    return;
  }

  const prompt = `You are a professional essay writer,give ${pointsCount} meaningful and descriptive points with each point no longer than 30 words to write a essay on "${topic}"`;
  //const prompt = `Please provide ${pointsCount} points, with each point no longer than 30 words for an essay discussing ${topic}.The essay should provide insightful and creative perspectives on the topic`
  const maxLength = 500


  getCompletion(prompt,maxLength,"text-davinci-003")
    .then((completion) => {
      console.log(completion);
      res.status(200).send(completion);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("unknown_error");
    });
};

export default pointsProvider;