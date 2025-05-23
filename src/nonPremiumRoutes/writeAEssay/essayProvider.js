import getCompletion from "../functions/getCompletion.js";
import axios from "axios";

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

  if (!["70", "100", "150", "200", "250"].includes(wordsCount)) {
    console.log("unregistered words count exceeded");
    res.status(406).send("unregisted_words_count_exceeded");
    return;
  }

  let prompt;
  if (type === "general") {
    const complexity = data.complexity;
    prompt = `imagine that You are a Professional essay Writer.Please write an essay on "${topic}" IN ${wordsCount} WORDS.Use ${complexity} vocabulary and sentence structures.`;
  } else if (type === "personalized") {
    const profileData = data.profileData;
    //prompt = `Dear ${profileData.name || "dave"}, as a ${profileData.occupation || "student"} who is ${profileData.age || "18"} years old and from ${profileData.country || "usa"} write a meaningful essay on "${topic}" in ${wordsCount} words.`
    //prompt = `Assume that you are pinidu, a collage student living in sri lanka.add personal references but do not do it unnecessarily.`
    prompt = `Imagine that you are ${profileData.fullName || "dave"}, a ${
      profileData.age || "18"
    } years old ${profileData.occupation || "student"} from ${
      profileData.country || "usa"
    }. Write an essay exploring the topic ${topic} IN ${wordsCount} WORDS. Be sure to incorporate relevant personal details to enhance the essay.`; //,but only include information that is necessary to support your arguments and illustrate your perspective.
  } else
    prompt = `You are a professional essay writer,write a complete and meaningful essay on "${topic}" in ${wordsCount} words.`;

  //const model = "text-curie-001";
  prompt +=
    " aware of tenses.do not write anything like 'i am a language model',just write the essay.";


  getCompletion(prompt)
    .then((completion) => {
      res.status(200).send(completion);
    })
    .catch((err) => {
      res.status(500).send("unknown error");
    });
};

export default essayProvider;
