import getCompletion from "../functions/getCompletion.js";

const essayProvider = (req, res) => {
  const topic = req.body.topic;
  const wordsCount = req.body.count;

  if (!(topic && wordsCount)) {
    console.log("details missing");
    res.status(406).send("details_missing");
    return;
  }

  if (topic.length > 31) {
    console.log("unregistered_topics_length_exceeded");
    res.status(406).send("unregisted topic length exceeded");
    return;
  }

  if (wordsCount > 301) {
    console.log("unregistered words count exceeded");
    res.status(406).send("unregisted_words_count_exceeded");
    return;
  }

  const prompt = `You are a professional essay writer,write a complete and meaningful essay containing ${wordsCount} words on topic "${topic}"`;

  const model = "text-davinci-003";
  //const model = "text-curie-001";


  getCompletion(prompt,model)
    .then((completion) => {
      console.log(completion);
      res.status(200).send(completion);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("unknown_err");
    });
};

export default essayProvider;
