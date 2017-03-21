{
  // YAML will be parsed as meta data.
  meta: {
    title: 'Title',
  },

  // Others will be parsed as JsonML.
  content:  [
    "article",
    ["h1", "Here is a heading"],
    [
      "ol",
      [
        "li",
        [
          "p",
          "First"
        ]
      ],
    ],
    [
      "p",
      "This is a paragraph, including ",
      [
        "em",
        "EM"
      ],
      " and ",
      [
        "strong",
        "STRONG"
      ],
      ". Any question? Oh, I almost forget ",
      [
        "code",
        "inline code"
      ],
      "."
    ],
  ]
}