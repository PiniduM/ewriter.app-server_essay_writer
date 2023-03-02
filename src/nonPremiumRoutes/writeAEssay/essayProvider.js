import getCompletion from "../functions/getCompletion.js";

const essayProvider = (req, res) => {
  const data = req.body;
  const topic = data.topic;
  const wordsCount = data.count;
  const type = data.type;

  if (!(topic && wordsCount && type)) {
    console.log("details missing");
    res.status(406).send("details_missing");
    return;
  }

  if (topic.length > 30) {
    console.log("unregistered_topics_length_exceeded");
    res.status(406).send("unregisted topic length exceeded");
    return;
  }

  if (wordsCount > 300) {
    console.log("unregistered words count exceeded");
    res.status(406).send("unregisted_words_count_exceeded");
    return;
  }

  let prompt;
  if (type === "general") {
    const complexity = data.complexity;
    prompt = `Please write an essay on "${topic}" in ${wordsCount} words.Use ${complexity} vocabulary and sentence structures.`
  }
  else if ((type === "personalized")) {
    const profileData = data.profileData;
    //prompt = `Dear ${profileData.name || "dave"}, as a ${profileData.occupation || "student"} who is ${profileData.age || "18"} years old and from ${profileData.country || "usa"} write a meaningful essay on "${topic}" in ${wordsCount} words.`
    //prompt = `Assume that you are pinidu, a collage student living in sri lanka.add personal references but do not do it unnecessarily.`
    prompt = `Imagine that you are ${profileData.name || "dave"}, a ${profileData.age || "18"} years old ${profileData.occupation || "student"} from ${profileData.country || "usa"}. Write an essay exploring the topic ${topic} IN ${wordsCount}WORDS. Be sure to incorporate relevant personal details to enhance the essay, but only include information that is necessary to support your arguments and illustrate your perspective.`
    console.log(prompt);

  }
  else prompt = `You are a professional essay writer,write a complete and meaningful essay on "${topic}" in ${wordsCount} words.`;

  //const model = "text-curie-001";

  console.log(prompt);

  getCompletion(prompt)
    .then((completion) => {
      res.status(200).send(completion);
    })
    .catch((err) => {
      res.status(500).send("unknown error");
    });
};

export default essayProvider;
