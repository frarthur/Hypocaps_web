import { Questionnaire, SelectOption } from "./types";

type Texts = {
  introTitle: string;
  introDesc: string;
  first_name: { label: string; placeholder: string };
  age: { label: string; placeholder: string };
  email: { label: string; placeholder: string };
  diabetesTitle: string;
  diabetesDesc: string;
  concern_diabetes: { label: string; options: SelectOption[] };
  diabetes_type: { label: string; options: SelectOption[] };
  resucrageTitle: string;
  resucrageDesc: string;
  uses_resucrage: { label: string; options: SelectOption[] };
  resucrage_food_types: { label: string; options: SelectOption[] };
  resucrage_specialized: { label: string; options: SelectOption[] };
  resucrage_specialized_other: { label: string; placeholder: string };
  has_resucrage_problems: { label: string; options: SelectOption[] };
  resucrage_problems: { label: string; options: SelectOption[] };
  resucrage_problems_other: { label: string; placeholder: string };
  resucrage_form_preference: { label: string; options: SelectOption[] };
  opinionTitle: string;
  opinionDesc: string;
  should_be_reimbursed: { label: string; options: SelectOption[] };
  would_try_neutral_taste: { label: string; options: SelectOption[] };
  required: string;
  select: string;
  pageTitle: string;
  pageDesc: string;
};

const fr: Texts = {
  introTitle: "Présentation",
  introDesc:
    "Merci d'avoir pris le temps de vous intéresser à ce questionnaire. Nous sommes Hypocaps, un projet qui vise à rendre la vie des personnes atteintes d'hypoglycémie (souvent diabétiques) plus simple. Nous souhaitons proposer une solution de transport et de resucrage au goût neutre afin d'éviter les problèmes qu'ils soulèvent. Ce questionnaire est anonyme.",
  first_name: { label: "Prénom", placeholder: "Votre prénom (optionnel)" },
  age: { label: "Âge", placeholder: "Votre âge" },
  email: { label: "Email", placeholder: "vous@exemple.fr (optionnel)" },
  diabetesTitle: "Contexte diabète",
  diabetesDesc: "Parlez-nous de votre lien avec le diabète.",
  concern_diabetes: {
    label: "Êtes-vous concerné par le diabète ?",
    options: [
      { value: "yes", label: "Oui" },
      { value: "relative", label: "Un proche" },
      { value: "both", label: "Les deux" },
      { value: "no", label: "Non" },
    ],
  },
  diabetes_type: {
    label: "Quel type de diabète ?",
    options: [
      { value: "type1", label: "Type 1" },
      { value: "type2", label: "Type 2" },
      { value: "other", label: "Autre" },
      { value: "dont_know", label: "Je ne sais pas" },
    ],
  },
  resucrageTitle: "Habitudes de resucrage",
  resucrageDesc:
    "Ces questions concernent votre expérience personnelle avec le resucrage.",
  uses_resucrage: {
    label: "Utilisez-vous des produits de resucrage ?",
    options: [
      { value: "always", label: "Oui, toujours" },
      { value: "sometimes", label: "Parfois" },
      { value: "never", label: "Non, jamais" },
    ],
  },
  resucrage_food_types: {
    label: "Quels aliments génériques utilisez-vous pour vous resucrer ?",
    options: [
      { value: "sugar_cubes", label: "Sucre (carré / buchette)" },
      { value: "juice_box", label: "Briquette de jus" },
      { value: "honey", label: "Miel" },
      { value: "jam", label: "Confiture" },
      { value: "fruit", label: "Fruit" },
      { value: "candy", label: "Bonbons" },
      { value: "soda", label: "Soda sucré" },
      { value: "compote", label: "Compote" },
      { value: "cereal_bar", label: "Barre de céréale" },
    ],
  },
  resucrage_specialized: {
    label: "Quels produits spécialisés utilisez-vous ?",
    options: [
      { value: "gels", label: "Gels sucrés" },
      { value: "pastilles", label: "Pastilles sucrées" },
      { value: "other", label: "Autre" },
    ],
  },
  resucrage_specialized_other: {
    label: "Précisez votre autre produit spécialisé :",
    placeholder: "Écrivez le nom du produit...",
  },
  has_resucrage_problems: {
    label:
      "Rencontrez-vous des problèmes liés à vos solutions de resucrage ?",
    options: [
      { value: "yes", label: "Oui" },
      { value: "no", label: "Non" },
      { value: "sometimes", label: "Parfois" },
    ],
  },
  resucrage_problems: {
    label: "Quels types de problèmes rencontrez-vous ?",
    options: [
      { value: "packaging", label: "Usure de l'emballage" },
      { value: "transport", label: "Transport compliqué" },
      { value: "forget", label: "Oubli" },
      { value: "mess", label: "Salissures" },
      { value: "other", label: "Autre" },
    ],
  },
  resucrage_problems_other: {
    label: "Précisez votre autre problème :",
    placeholder: "Écrivez...",
  },
  resucrage_form_preference: {
    label: "Sous quelle forme aimeriez-vous vous resucrer ?",
    options: [
      { value: "liquid", label: "Liquide (comme l'aspirine)" },
      { value: "solid", label: "Solide (comme un Doliprane)" },
      {
        value: "gel",
        label: "Gel (type Gaviscon/compote avec une texture plus adaptée)",
      },
      { value: "gummies", label: "Gummies (comme les ours Haribo)" },
    ],
  },
  opinionTitle: "Votre avis",
  opinionDesc:
    "Quelques questions pour tous, que vous soyez diabétique ou non.",
  should_be_reimbursed: {
    label:
      "Pensez-vous que les solutions de resucrage spécialisées pour les diabétiques devraient être remboursées ?",
    options: [
      { value: "yes", label: "Oui" },
      { value: "no", label: "Non" },
      { value: "dont_know", label: "Je ne sais pas" },
    ],
  },
  would_try_neutral_taste: {
    label:
      "En tant que diabétique, seriez-vous prêt à adopter une solution de resucrage au goût neutre ?",
    options: [
      { value: "yes", label: "Oui" },
      { value: "no", label: "Non" },
      { value: "maybe", label: "Peut-être" },
    ],
  },
  required: "Veuillez sélectionner une option",
  select: "Sélectionnez...",
  pageTitle: "Questionnaire - Hypocaps",
  pageDesc: "Étude sur la gestion de l'hypoglycémie et les habitudes de resucrage",
};

const en: Texts = {
  introTitle: "Introduction",
  introDesc:
    "Thank you for taking the time to fill out this questionnaire. We are Hypocaps, a project aimed at making life easier for people with hypoglycemia (often diabetic). We want to offer a transport solution and a neutral-tasting glucose rescue product to avoid the problems they currently face. This questionnaire is anonymous.",
  first_name: { label: "First name", placeholder: "Your first name (optional)" },
  age: { label: "Age", placeholder: "Your age" },
  email: { label: "Email", placeholder: "you@example.com (optional)" },
  diabetesTitle: "Diabetes context",
  diabetesDesc: "Tell us about your connection to diabetes.",
  concern_diabetes: {
    label: "Are you affected by diabetes?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "relative", label: "A relative" },
      { value: "both", label: "Both" },
      { value: "no", label: "No" },
    ],
  },
  diabetes_type: {
    label: "What type of diabetes?",
    options: [
      { value: "type1", label: "Type 1" },
      { value: "type2", label: "Type 2" },
      { value: "other", label: "Other" },
      { value: "dont_know", label: "I don't know" },
    ],
  },
  resucrageTitle: "Rescue habits",
  resucrageDesc:
    "These questions are about your personal experience with glucose rescue products.",
  uses_resucrage: {
    label: "Do you use glucose rescue products?",
    options: [
      { value: "always", label: "Yes, always" },
      { value: "sometimes", label: "Sometimes" },
      { value: "never", label: "No, never" },
    ],
  },
  resucrage_food_types: {
    label: "Which generic foods do you use to raise your blood sugar?",
    options: [
      { value: "sugar_cubes", label: "Sugar cubes" },
      { value: "juice_box", label: "Juice box" },
      { value: "honey", label: "Honey" },
      { value: "jam", label: "Jam" },
      { value: "fruit", label: "Fruit" },
      { value: "candy", label: "Candy" },
      { value: "soda", label: "Sugary soda" },
      { value: "compote", label: "Apple sauce" },
      { value: "cereal_bar", label: "Cereal bar" },
    ],
  },
  resucrage_specialized: {
    label: "Which specialized products do you use?",
    options: [
      { value: "gels", label: "Glucose gels" },
      { value: "pastilles", label: "Glucose tablets" },
      { value: "other", label: "Other" },
    ],
  },
  resucrage_specialized_other: {
    label: "Please specify your other specialized product:",
    placeholder: "Write the product name...",
  },
  has_resucrage_problems: {
    label: "Do you encounter problems with your rescue solutions?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "sometimes", label: "Sometimes" },
    ],
  },
  resucrage_problems: {
    label: "What kind of problems do you encounter?",
    options: [
      { value: "packaging", label: "Packaging wear" },
      { value: "transport", label: "Difficult to carry" },
      { value: "forget", label: "Forgetting them" },
      { value: "mess", label: "Messy" },
      { value: "other", label: "Other" },
    ],
  },
  resucrage_problems_other: {
    label: "Please specify your other problem:",
    placeholder: "Write...",
  },
  resucrage_form_preference: {
    label: "In what form would you like to take your rescue product?",
    options: [
      { value: "liquid", label: "Liquid (like aspirin)" },
      { value: "solid", label: "Solid (like a tablet)" },
      {
        value: "gel",
        label: "Gel (like Gaviscon/apple sauce with adapted texture)",
      },
      { value: "gummies", label: "Gummies (like Haribo bears)" },
    ],
  },
  opinionTitle: "Your opinion",
  opinionDesc:
    "A few questions for everyone, whether you are diabetic or not.",
  should_be_reimbursed: {
    label:
      "Do you think specialized glucose rescue products for diabetics should be reimbursed?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "dont_know", label: "I don't know" },
    ],
  },
  would_try_neutral_taste: {
    label:
      "As a diabetic, would you be willing to adopt a neutral-tasting rescue product?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "maybe", label: "Maybe" },
    ],
  },
  required: "Please select an option",
  select: "Select...",
  pageTitle: "Questionnaire - Hypocaps",
  pageDesc: "Study on hypoglycemia management and glucose rescue habits",
};

const texts = { fr, en };

export function getTexts(lang: "fr" | "en") {
  return texts[lang];
}

export function getQuestionnaire(lang: "fr" | "en"): Questionnaire {
  const t = getTexts(lang);

  return [
    {
      id: "introduction",
      title: t.introTitle,
      description: t.introDesc,
      fields: [
        {
          id: "first_name",
          type: "text",
          label: t.first_name.label,
          placeholder: t.first_name.placeholder,
        },
        {
          id: "age",
          type: "text",
          label: t.age.label,
          placeholder: t.age.placeholder,
        },
        {
          id: "email",
          type: "email",
          label: t.email.label,
          placeholder: t.email.placeholder,
        },
      ],
    },
    {
      id: "diabetes_context",
      title: t.diabetesTitle,
      description: t.diabetesDesc,
      fields: [
        {
          id: "concern_diabetes",
          type: "select",
          label: t.concern_diabetes.label,
          options: t.concern_diabetes.options,
          validation: [{ type: "required", message: t.required }],
        },
        {
          id: "diabetes_type",
          type: "select",
          label: t.diabetes_type.label,
          showIf: (answers) =>
            answers.concern_diabetes !== undefined &&
            answers.concern_diabetes !== "no",
          options: t.diabetes_type.options,
        },
      ],
    },
    {
      id: "resucrage_habits",
      title: t.resucrageTitle,
      description: t.resucrageDesc,
      fields: [
        {
          id: "uses_resucrage",
          type: "select",
          label: t.uses_resucrage.label,
          showIf: (answers) => {
            const c = answers.concern_diabetes;
            return c === "yes" || c === "both";
          },
          options: t.uses_resucrage.options,
          validation: [{ type: "required", message: t.required }],
        },
        {
          id: "resucrage_food_types",
          type: "checkbox",
          label: t.resucrage_food_types.label,
          showIf: (answers) => {
            const use = answers.uses_resucrage;
            return use === "always" || use === "sometimes";
          },
          options: t.resucrage_food_types.options,
        },
        {
          id: "resucrage_specialized",
          type: "checkbox",
          label: t.resucrage_specialized.label,
          showIf: (answers) => {
            const use = answers.uses_resucrage;
            return use === "always" || use === "sometimes";
          },
          options: t.resucrage_specialized.options,
        },
        {
          id: "resucrage_specialized_other",
          type: "text",
          label: t.resucrage_specialized_other.label,
          placeholder: t.resucrage_specialized_other.placeholder,
          showIf: (answers) => {
            const val = answers.resucrage_specialized;
            return Array.isArray(val) && val.includes("other");
          },
        },
        {
          id: "has_resucrage_problems",
          type: "select",
          label: t.has_resucrage_problems.label,
          showIf: (answers) => {
            const use = answers.uses_resucrage;
            return use === "always" || use === "sometimes";
          },
          options: t.has_resucrage_problems.options,
        },
        {
          id: "resucrage_problems",
          type: "checkbox",
          label: t.resucrage_problems.label,
          showIf: (answers) => {
            const p = answers.has_resucrage_problems;
            return p === "yes" || p === "sometimes";
          },
          options: t.resucrage_problems.options,
        },
        {
          id: "resucrage_problems_other",
          type: "text",
          label: t.resucrage_problems_other.label,
          placeholder: t.resucrage_problems_other.placeholder,
          showIf: (answers) => {
            const val = answers.resucrage_problems;
            return Array.isArray(val) && val.includes("other");
          },
        },
        {
          id: "resucrage_form_preference",
          type: "select",
          label: t.resucrage_form_preference.label,
          showIf: (answers) => {
            const c = answers.concern_diabetes;
            return c === "yes" || c === "both";
          },
          options: t.resucrage_form_preference.options,
        },
      ],
    },
    {
      id: "general_opinion",
      title: t.opinionTitle,
      description: t.opinionDesc,
      fields: [
        {
          id: "should_be_reimbursed",
          type: "select",
          label: t.should_be_reimbursed.label,
          options: t.should_be_reimbursed.options,
          validation: [{ type: "required", message: t.required }],
        },
        {
          id: "would_try_neutral_taste",
          type: "select",
          label: t.would_try_neutral_taste.label,
          showIf: (answers) => {
            const c = answers.concern_diabetes;
            return c === "yes" || c === "both";
          },
          options: t.would_try_neutral_taste.options,
        },
      ],
    },
  ];
}
