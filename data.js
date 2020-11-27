const questionsReponses = [
    {
      id: 0,
      type: "reponse-open",
      question: "Entrez la fonction qui permet d'afficher dans la console: ",
      reponse: "print",
      renduconsole: "Hello World",
      // phrase complète print("Hello World")
      remaining: ["", '("Hello World")'],
    },
    {
      id: 1,
      question: "la quelle de ces propostions est une string?",
      reponses: ["&lt;hello&gt;", "/hey/", "[hallo]", "&apos;yo&apos;"],
      bonreponse: "&apos;yo&apos;",
      type: "reponse-choixMultiple",
    },
    {
      id: 2,
      question:
        "Complètez la ligne de commande pour afficher cinq fois le mot &apos;gold&apos;",
      renduconsole: "goldgoldgoldgoldgold",
      choices: ["*", "&apos;gold&apos;", "print(", "5", ")"],
      // création du même nb d'emplacements vides que les choices ?
      tofill: [
        "&nbsp;&nbsp;",
        "&nbsp;&nbsp;",
        "&nbsp;&nbsp;",
        "&nbsp;&nbsp;",
        "&nbsp;&nbsp;",
      ],
      type: "reponse-drag",
    },
  ];