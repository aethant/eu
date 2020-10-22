import Axios from "axios";

export default async (req, res) => {
  try {
    const { data } = await Axios({
      method: "get",
      url: "https://restcountries.eu/rest/v2/region/europe",
    });

    return res.status(200).send(data);
  } catch (error) {
    res.send(error).status(500);
  }
};
