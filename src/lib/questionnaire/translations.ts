import { Questionnaire, SelectOption } from "./types";

type Texts = {
  introTitle: string;
  introDesc: string;
  first_name: { label: string; placeholder: string };
  age: { label: string; placeholder: string; requiredMsg: string };
  email: { label: string; placeholder: string };
  source: { label: string; options: SelectOption[] };
  diabetesTitle: string;
  diabetesDesc: string;
  concern_diabetes: { label: string; options: SelectOption[] };
  diabetes_type: { label: string; options: SelectOption[] };
  resucrageTitle: string;
  resucrageDesc: string;
  resucrageTitleRelative: string;
  resucrageDescRelative: string;
  uses_resucrage: { label: string; options: SelectOption[] };
  uses_resucrage_relative: { label: string; options: SelectOption[] };
  resucrage_food_types: { label: string; options: SelectOption[] };
  resucrage_food_types_relative: { label: string; options: SelectOption[] };
  resucrage_specialized: { label: string; options: SelectOption[] };
  resucrage_specialized_relative: { label: string; options: SelectOption[] };
  resucrage_specialized_other: { label: string; placeholder: string };
  resucrage_specialized_other_relative: { label: string; placeholder: string };
  has_resucrage_problems: { label: string; options: SelectOption[] };
  has_resucrage_problems_relative: { label: string; options: SelectOption[] };
  resucrage_problems: { label: string; options: SelectOption[] };
  resucrage_problems_relative: { label: string; options: SelectOption[] };
  resucrage_problems_other: { label: string; placeholder: string };
  resucrage_problems_other_relative: { label: string; placeholder: string };
  resucrage_form_preference: { label: string; options: SelectOption[] };
  resucrage_form_preference_relative: { label: string; options: SelectOption[] };
  opinionTitle: string;
  opinionDesc: string;
  should_be_reimbursed: { label: string; options: SelectOption[] };
  would_try_neutral_taste: { label: string; options: SelectOption[] };
  would_try_neutral_taste_relative: { label: string; options: SelectOption[] };
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
  age: { label: "Âge", placeholder: "Votre âge", requiredMsg: "Veuillez indiquer votre âge" },
  email: { label: "Email", placeholder: "vous@exemple.fr (optionnel)" },
  source: {
    label: "Comment nous avez-vous connus ?",
    options: [
      { value: "pharmacie", label: "Pharmacie" },
      { value: "instagram", label: "Instagram" },
      { value: "facebook", label: "Facebook" },
      { value: "linkedin", label: "LinkedIn" },
      { value: "proche", label: "Un proche" },
      { value: "reddit", label: "Reddit" },
      { value: "search", label: "Recherche internet" },
      { value: "other", label: "Autre" },
    ],
  },
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
      { value: "type1_5", label: "Type 1.5 (LADA)" },
      { value: "type2", label: "Type 2" },
      { value: "type3c", label: "Type 3c" },
      { value: "gestationnel", label: "Gestationnel" },
      { value: "MODY", label: "MODY" },
      { value: "CFRD", label: "CFRD (mucoviscidose)" },
      { value: "prediabete", label: "Prédiabète" },
      { value: "MIDD", label: "MIDD" },
      { value: "steroid_induced", label: "Diabète induit par les stéroïdes" },
      { value: "other", label: "Autre" },
      { value: "dont_know", label: "Je ne sais pas" },
    ],
  },
  resucrageTitle: "Habitudes de resucrage",
  resucrageDesc:
    "Ces questions concernent votre expérience personnelle avec le resucrage.",
  resucrageTitleRelative: "Votre proche et le resucrage",
  resucrageDescRelative:
    "Ces questions concernent la personne diabétique que vous connaissez.",
  uses_resucrage: {
    label: "Utilisez-vous des produits de resucrage ?",
    options: [
      { value: "always", label: "Oui, toujours" },
      { value: "sometimes", label: "Parfois" },
      { value: "never", label: "Non, jamais" },
    ],
  },
  uses_resucrage_relative: {
    label: "La personne que vous connaissez utilise-t-elle des produits de resucrage ?",
    options: [
      { value: "always", label: "Oui, toujours" },
      { value: "sometimes", label: "Parfois" },
      { value: "never", label: "Non, jamais" },
      { value: "dont_know", label: "Je ne sais pas" },
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
  resucrage_food_types_relative: {
    label: "Quels aliments génériques cette personne utilise-t-elle pour se resucrer ?",
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
  resucrage_specialized_relative: {
    label: "Quels produits spécialisés cette personne utilise-t-elle ?",
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
  resucrage_specialized_other_relative: {
    label: "Précisez l'autre produit spécialisé :",
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
  has_resucrage_problems_relative: {
    label:
      "Cette personne rencontre-t-elle des problèmes liés à ses solutions de resucrage ?",
    options: [
      { value: "yes", label: "Oui" },
      { value: "no", label: "Non" },
      { value: "sometimes", label: "Parfois" },
      { value: "dont_know", label: "Je ne sais pas" },
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
  resucrage_problems_relative: {
    label: "Quels types de problèmes cette personne rencontre-t-elle ?",
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
  resucrage_problems_other_relative: {
    label: "Précisez l'autre problème :",
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
  resucrage_form_preference_relative: {
    label: "Sous quelle forme penseriez-vous que cette personne aimerait se resucrer ?",
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
  would_try_neutral_taste_relative: {
    label:
      "Pensez-vous que cette personne serait prête à adopter une solution de resucrage au goût neutre ?",
    options: [
      { value: "yes", label: "Oui" },
      { value: "no", label: "Non" },
      { value: "maybe", label: "Peut-être" },
      { value: "dont_know", label: "Je ne sais pas" },
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
  age: { label: "Age", placeholder: "Your age", requiredMsg: "Please enter your age" },
  email: { label: "Email", placeholder: "you@example.com (optional)" },
  source: {
    label: "How did you hear about us?",
    options: [
      { value: "reddit", label: "Reddit" },
      { value: "pharmacie", label: "Pharmacy" },
      { value: "proche", label: "Friend or family" },
      { value: "instagram", label: "Instagram" },
      { value: "facebook", label: "Facebook" },
      { value: "linkedin", label: "LinkedIn" },
      { value: "search", label: "Internet search" },
    ],
  },
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
      { value: "type1_5", label: "Type 1.5 (LADA)" },
      { value: "type2", label: "Type 2" },
      { value: "type3c", label: "Type 3c" },
      { value: "gestationnel", label: "Gestational" },
      { value: "MODY", label: "MODY" },
      { value: "CFRD", label: "CFRD (cystic fibrosis)" },
      { value: "prediabete", label: "Prediabetes" },
      { value: "MIDD", label: "MIDD" },
      { value: "steroid_induced", label: "Steroid-induced diabetes" },
      { value: "other", label: "Other" },
      { value: "dont_know", label: "I don't know" },
    ],
  },
  resucrageTitle: "Rescue habits",
  resucrageDesc:
    "These questions are about your personal experience with glucose rescue products.",
  resucrageTitleRelative: "Your relative and glucose rescue",
  resucrageDescRelative:
    "These questions are about the diabetic person you know.",
  uses_resucrage: {
    label: "Do you use glucose rescue products?",
    options: [
      { value: "always", label: "Yes, always" },
      { value: "sometimes", label: "Sometimes" },
      { value: "never", label: "No, never" },
    ],
  },
  uses_resucrage_relative: {
    label: "Does the person you know use glucose rescue products?",
    options: [
      { value: "always", label: "Yes, always" },
      { value: "sometimes", label: "Sometimes" },
      { value: "never", label: "No, never" },
      { value: "dont_know", label: "I don't know" },
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
  resucrage_food_types_relative: {
    label: "Which generic foods does this person use to raise their blood sugar?",
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
  resucrage_specialized_relative: {
    label: "Which specialized products does this person use?",
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
  resucrage_specialized_other_relative: {
    label: "Please specify the other specialized product:",
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
  has_resucrage_problems_relative: {
    label: "Does this person encounter problems with their rescue solutions?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "sometimes", label: "Sometimes" },
      { value: "dont_know", label: "I don't know" },
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
  resucrage_problems_relative: {
    label: "What kind of problems does this person encounter?",
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
  resucrage_problems_other_relative: {
    label: "Please specify the other problem:",
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
  resucrage_form_preference_relative: {
    label: "In what form do you think this person would like to take their rescue product?",
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
  would_try_neutral_taste_relative: {
    label:
      "Do you think this person would be willing to adopt a neutral-tasting rescue product?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "maybe", label: "Maybe" },
      { value: "dont_know", label: "I don't know" },
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
          inputMode: "numeric",
          pattern: "[0-9]*",
          validation: [{ type: "required", message: t.age.requiredMsg }],
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
      title: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.resucrageTitleRelative : t.resucrageTitle,
      description: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.resucrageDescRelative : t.resucrageDesc,
      showIf: (answers) => {
        const c = answers.concern_diabetes;
        return c === "yes" || c === "both" || c === "relative";
      },
      fields: [
        {
          id: "uses_resucrage",
          type: "select" as const,
          label: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.uses_resucrage_relative.label : t.uses_resucrage.label,
          options: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.uses_resucrage_relative.options : t.uses_resucrage.options,
          showIf: (answers) => {
            const c = answers.concern_diabetes;
            return c === "yes" || c === "both" || c === "relative";
          },
          validation: [{ type: "required", message: t.required }],
        },
        {
          id: "resucrage_food_types",
          type: "checkbox" as const,
          label: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.resucrage_food_types_relative.label : t.resucrage_food_types.label,
          showIf: (answers) => {
            const use = answers.uses_resucrage;
            return use === "always" || use === "sometimes";
          },
          options: t.resucrage_food_types.options,
        },
        {
          id: "resucrage_specialized",
          type: "checkbox" as const,
          label: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.resucrage_specialized_relative.label : t.resucrage_specialized.label,
          showIf: (answers) => {
            const use = answers.uses_resucrage;
            return use === "always" || use === "sometimes";
          },
          options: t.resucrage_specialized.options,
        },
        {
          id: "resucrage_specialized_other",
          type: "text" as const,
          label: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.resucrage_specialized_other_relative.label : t.resucrage_specialized_other.label,
          placeholder: t.resucrage_specialized_other_relative.placeholder,
          showIf: (answers) => {
            const val = answers.resucrage_specialized;
            return Array.isArray(val) && val.includes("other");
          },
        },
        {
          id: "has_resucrage_problems",
          type: "select" as const,
          label: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.has_resucrage_problems_relative.label : t.has_resucrage_problems.label,
          options: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.has_resucrage_problems_relative.options : t.has_resucrage_problems.options,
          showIf: (answers) => {
            const use = answers.uses_resucrage;
            return use === "always" || use === "sometimes";
          },
        },
        {
          id: "resucrage_problems",
          type: "checkbox" as const,
          label: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.resucrage_problems_relative.label : t.resucrage_problems.label,
          showIf: (answers) => {
            const p = answers.has_resucrage_problems;
            return p === "yes" || p === "sometimes";
          },
          options: t.resucrage_problems.options,
        },
        {
          id: "resucrage_problems_other",
          type: "text" as const,
          label: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.resucrage_problems_other_relative.label : t.resucrage_problems_other.label,
          placeholder: t.resucrage_problems_other_relative.placeholder,
          showIf: (answers) => {
            const val = answers.resucrage_problems;
            return Array.isArray(val) && val.includes("other");
          },
        },
        {
          id: "resucrage_form_preference",
          type: "select" as const,
          label: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.resucrage_form_preference_relative.label : t.resucrage_form_preference.label,
          showIf: (answers) => {
            const c = answers.concern_diabetes;
            return c === "yes" || c === "both" || c === "relative";
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
          id: "source",
          type: "select",
          label: t.source.label,
          options: t.source.options,
          validation: [{ type: "required", message: t.required }],
        },
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
          label: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.would_try_neutral_taste_relative.label : t.would_try_neutral_taste.label,
          options: (answers: Record<string, string | string[]>) => answers.concern_diabetes === "relative" ? t.would_try_neutral_taste_relative.options : t.would_try_neutral_taste.options,
          showIf: (answers) => {
            const c = answers.concern_diabetes;
            return c === "yes" || c === "both" || c === "relative";
          },
        },
      ],
    },
  ];
}
