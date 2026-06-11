import type { Meta, StoryObj } from "@storybook/react";
import PricingSection from "../../components/sections/PricingSection";

const meta: Meta<typeof PricingSection> = {
  title: "Sections/PricingSection",
  component: PricingSection,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PricingSection>;

export const Default: Story = {
  args: {
    title: { text: "Nos Formules" },
    subtitle: "Choisissez la formule qui vous convient",
    colors: "bg-light-fg-dark",
    plans: [
      {
        title: "Découverte",
        price: "Gratuit",
        description:
          "Accès aux fonctionnalités de base pour découvrir Hypocaps.",
        features: [
          "Suivi de glycémie",
          "Rappels personnalisés",
          "Communauté de soutien",
        ],
        actions: [
          {
            label: "S'inscrire",
            url: "#",
            __metadata: { modelName: "Button" },
          },
        ],
      },
      {
        title: "Premium",
        price: "9,99€",
        details: "/mois",
        description:
          "Pour les utilisateurs réguliers qui veulent aller plus loin.",
        features: [
          "Tout le plan Découverte",
          "Rapports détaillés",
          "Conseils personnalisés IA",
          "Support prioritaire",
        ],
        actions: [
          {
            label: "Choisir Premium",
            url: "#",
            __metadata: { modelName: "Button" },
          },
        ],
      },
      {
        title: "Famille",
        price: "19,99€",
        details: "/mois",
        description:
          "Pour toute la famille, avec des fonctionnalités partagées.",
        features: [
          "Tout le plan Premium",
          "Jusqu'à 5 profils",
          "Partage de données",
          "Alertes proches",
          "Assistance prioritaire 24/7",
        ],
        actions: [
          {
            label: "Choisir Famille",
            url: "#",
            __metadata: { modelName: "Button" },
          },
        ],
      },
    ],
  },
};
