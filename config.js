const PAGE_URL =
  process.env.NODE_ENV === "production"
    ? "placeholder"
    : "http://localhost:3010";

module.exports = { PAGE_URL };
