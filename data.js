const questionsReponses = [

    {
      type: "reponse-open",
      question: "Complétez fonction afin d'afficher Hello World dans la console: ",
      renduconsole: "Hello World",
      remaining: ["", '("Hello World")'],
    },
    {
      type: "reponse-choixMultiple",
      question: "Laquelle de ces propositions est une string?",
      reponses: ["&lt;hello&gt;", "/hey/", "[hallo]", "&apos;yo&apos;"],
      bonreponse: "'yo'",
    },
    {
      type: "reponse-choixMultiple",
      question: "Laquelle de ces expressions n’est-elle PAS un synonyme de ’i = i + 1’ ?",
      reponses: ["i+=1", "i++", "i=+1", "i = i + (-i * 2)/(i * -2)" ],
      bonreponse: "i=+1"
    },
    {
      type: "reponse-choixMultiple",
      question: "Cette condition est-elle vraie ou fausse?<br>((False or True) and (False and False))",
      reponses: ["Vrai", "Faux"],
      bonreponse: "Faux"
    },
    {
      type: "reponse-choixMultiple",
      question: "Cette condition est-elle vraie ou fausse?<br>(True and not (True and not False))",
      reponses: ["Vrai", "Faux"],
      bonreponse: "Faux"
    },
    {
      type: "reponse-open",
      question: "Complétez ce code afin qu’il affiche les chiffres de 0 à 9:",
      //reponse: "for hello in range(10):",
      renduconsole: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9",
      remaining: ["", "<br>&emsp;print(hello)"]
    },
  ];






/*
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
*/