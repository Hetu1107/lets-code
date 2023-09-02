exports.runcode = async (req, res, next) => {
  const { input, code } = req.body;
  try {
    // fetch the response from the api
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": process.env.RUN_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          stdin: input,
          language_id: 54,
        }),
      }
    );
    // getting token from the res
    const jsonRes = await response.json();
    if (jsonRes.token) {
      let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonRes.token}`;
      async function getSolution(url) {
        const data = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": process.env.RUN_KEY,
            "content-type": "application/json",
            Accept: "*/*",
          },
        });
        return data.json();
      }
      // get output from the api
      const jsonGetSolution = await getSolution(url);
      let re = "server error";
      if (jsonGetSolution.stdout) {
        re = jsonGetSolution.stdout;
      } else if (jsonGetSolution.stderr) {
        re = jsonGetSolution.stderr;
      } else {
        re = jsonGetSolution.compile_output;
      }
      res.status(200).json({ re });
    } else {
      next(jsonRes.error);
    }
  } catch (e) {
    next(e);
  }
};
