import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GenericSection from "../../components/sections/GenericSection";

const meta: Meta<typeof GenericSection> = {
  title: "Sections/GenericSection",
  component: GenericSection,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GenericSection>;

export const Default: Story = {
  args: {
    title: { text: "Notre Mission" },
    subtitle: "Rendre la vie des personnes hypoglycémiques plus simple",
    text: "Chez **Hypocaps**, nous développons une solution de resucrage au goût neutre, facile à transporter et à utiliser. Notre objectif est de remplacer les solutions actuelles qui sont souvent salissantes, encombrantes ou désagréables.\n\nNous croyons qu'il est possible de mieux vivre avec l'hypoglycémie grâce à l'innovation.",
    colors: "bg-light-fg-dark",
    actions: [
      {
        label: "En savoir plus",
        url: "#",
        __metadata: { modelName: "Button" },
      },
      {
        label: "Nous contacter",
        url: "#",
        style: "secondary",
        __metadata: { modelName: "Link" },
      },
    ],
  },
};

export const WithBadge: Story = {
  args: {
    badge: { label: "Nouveau", color: "text-primary" },
    title: { text: "Notre Solution" },
    text: "Découvrez notre nouveau produit conçu pour répondre aux besoins des personnes diabétiques.",
    colors: "bg-light-fg-dark",
  },
};

export const DarkBackground: Story = {
  args: {
    title: { text: "Rejoignez l'aventure", color: "text-light" },
    text: "Nous recrutons des talents passionnés pour améliorer la qualité de vie des personnes diabétiques.",
    colors: "bg-dark-fg-light",
    actions: [
      {
        label: "Voir les offres",
        url: "#",
        __metadata: { modelName: "Button" },
      },
    ],
  },
};
