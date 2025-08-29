const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FullName = "faheem_mohamad";
const DOB = "10022005";
const EMAIL = "faheem.22bce9942@vitapstudent.ac.in";
const RollNumber = "22BCE9942";
const user_id = `${FullName}_${DOB}`;

const isDigits = (s) => /^\d+$/.test(s);
const isLetters = (s) => /^[a-zA-Z]+$/.test(s);

function alternatingCapsReverseConcatFrom(inputArray) {
  const letters = [];
  for (const item of inputArray) {
    const s = String(item);
    for (const ch of s) {
      if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")) {
        letters.push(ch);
      }
    }
  }
  letters.reverse();
  return letters
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const data = Array.isArray(req.body?.data) ? req.body.data.map(String) : null;

    if (!data) {
      return res.status(200).json({
        is_success: false,
        user_id: user_id,
        email: EMAIL,
        roll_number: RollNumber,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        error: "Request body must be { data: string[] }"
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    for (const item of data) {
      if (isDigits(item)) {
        const n = parseInt(item, 10);
        sum += n;
        (n % 2 === 0 ? even_numbers : odd_numbers).push(item);
      } else if (isLetters(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    }

    const concat_string = alternatingCapsReverseConcatFrom(data);

    return res.status(200).json({
      is_success: true,
      user_id: user_id,
      email: EMAIL,
      roll_number: RollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });

  } catch (err) {
    console.error("Unexpected error in /bfhl:", err.message);

    return res.status(500).json({
      is_success: false,
      user_id: user_id,
      email: EMAIL,
      roll_number: RollNumber,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Internal Server Error"
    });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BFHL API running on port ${PORT}`));
