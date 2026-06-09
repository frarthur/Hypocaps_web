import { Questionnaire } from "./types";

export const questionnaire: Questionnaire = [
  {
    id: "introduction",
    title: "Présentation",
    description:
      "Merci d'avoir pris le temps de vous intéresser à ce questionnaire. Nous sommes Hypocaps, un projet qui vise à rendre la vie des personnes atteintes d'hypoglycémie (souvent diabétique) plus simple. Nous souhaitons proposer une solution de transport et de resucrage au goût neutre afin d'éviter les problèmes qu'ils soulèvent. Ce questionnaire est anonyme.",
    fields: [
      {
        id: "first_name",
        type: "text",
        label: "Prénom",
        placeholder: "Votre prénom (optionnel)",
      },
      {
        id: "age",
        type: "text",
        label: "Âge",
        placeholder: "Votre âge",
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        placeholder: "vous@exemple.fr (optionnel)",
      },
    ],
  },
  {
    id: "diabetes_context",
    title: "Contexte diabète",
    description: "Parlez-nous de votre lien avec le diabète.",
    fields: [
      {
        id: "concern_diabetes",
        type: "select",
        label: "Êtes-vous concerné par le diabète ?",
        options: ["Oui", "Un proche", "Les deux", "Non"],
        validation: [
          { type: "required", message: "Veuillez sélectionner une option" },
        ],
      },
      {
        id: "diabetes_type",
        type: "select",
        label: "Quel type de diabète ?",
        showIf: (answers) =>
          answers.concern_diabetes !== undefined &&
          answers.concern_diabetes !== "Non",
        options: ["Type 1", "Type 2", "Autre", "Je ne sais pas"],
      },
    ],
  },
  {
    id: "resucrage_habits",
    title: "Habitudes de resucrage",
    description:
      "Ces questions concernent votre expérience personnelle avec le resucrage.",
    fields: [
      {
        id: "uses_resucrage",
        type: "select",
        label: "Utilisez-vous des produits de resucrage ?",
        showIf: (answers) => {
          const c = answers.concern_diabetes;
          return c === "Oui" || c === "Les deux";
        },
        options: ["Oui, toujours", "Parfois", "Non, jamais"],
        validation: [
          { type: "required", message: "Veuillez sélectionner une option" },
        ],
      },
      {
        id: "resucrage_food_types",
        type: "checkbox",
        label: "Quels aliments génériques utilisez-vous pour vous resucrer ?",
        showIf: (answers) => {
          const use = answers.uses_resucrage;
          return use === "Oui, toujours" || use === "Parfois";
        },
        options: [
          "Sucre (carré / buchette)",
          "Briquette de jus",
          "Miel",
          "Confiture",
          "Fruit",
          "Bonbons",
          "Soda sucré",
          "Compote",
          "Barre de céréale",
        ],
      },
      {
        id: "resucrage_specialized",
        type: "checkbox",
        label: "Quels produits spécialisés utilisez-vous ?",
        showIf: (answers) => {
          const use = answers.uses_resucrage;
          return use === "Oui, toujours" || use === "Parfois";
        },
        options: ["Gels sucrés", "Pastilles sucrées", "Autre"],
      },
      {
        id: "resucrage_specialized_other",
        type: "text",
        label: "Précisez votre autre produit spécialisé :",
        placeholder: "Écrivez le nom du produit...",
        showIf: (answers) => {
          const val = answers.resucrage_specialized;
          return Array.isArray(val) && val.includes("Autre");
        },
      },
      {
        id: "has_resucrage_problems",
        type: "select",
        label:
          "Rencontrez-vous des problèmes liés à vos solutions de resucrage ?",
        showIf: (answers) => {
          const use = answers.uses_resucrage;
          return use === "Oui, toujours" || use === "Parfois";
        },
        options: ["Oui", "Non", "Parfois"],
      },
      {
        id: "resucrage_problems",
        type: "checkbox",
        label: "Quels types de problèmes rencontrez-vous ?",
        showIf: (answers) => {
          const p = answers.has_resucrage_problems;
          return p === "Oui" || p === "Parfois";
        },
        options: [
          "Usure de l'emballage",
          "Transport compliqué",
          "Oubli",
          "Salissures",
          "Autre",
        ],
      },
      {
        id: "resucrage_problems_other",
        type: "text",
        label: "Précisez votre autre problème :",
        placeholder: "Écrivez...",
        showIf: (answers) => {
          const val = answers.resucrage_problems;
          return Array.isArray(val) && val.includes("Autre");
        },
      },
      {
        id: "resucrage_form_preference",
        type: "select",
        label: "Sous quelle forme aimeriez-vous vous resucrer ?",
        showIf: (answers) => {
          const c = answers.concern_diabetes;
          return c === "Oui" || c === "Les deux";
        },
        options: [
          "Liquide (comme l'aspirine)",
          "Solide (comme un Doliprane)",
          "Gel (type Gaviscon/compote avec une texture plus adaptée)",
          "Gummies (comme les ours Haribo)",
        ],
      },
    ],
  },
  {
    id: "general_opinion",
    title: "Votre avis",
    description:
      "Quelques questions pour tous, que vous soyez diabétique ou non.",
    fields: [
      {
        id: "should_be_reimbursed",
        type: "select",
        label:
          "Pensez-vous que les solutions de resucrage spécialisées pour les diabétiques devraient être remboursées ?",
        options: ["Oui", "Non", "Je ne sais pas"],
        validation: [
          { type: "required", message: "Veuillez sélectionner une option" },
        ],
      },
      {
        id: "would_try_neutral_taste",
        type: "select",
        label:
          "En tant que diabétique, seriez-vous prêt à adopter une solution de resucrage au goût neutre ?",
        showIf: (answers) => {
          const c = answers.concern_diabetes;
          return c === "Oui" || c === "Les deux";
        },
        options: ["Oui", "Non", "Peut-être"],
      },
    ],
  },
];
