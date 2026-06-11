import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Footer from "../../components/sections/Footer";

const meta: Meta<typeof Footer> = {
  title: "Sections/Footer",
  component: Footer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    title: "Hypocaps",
    text: "Une solution de resucrage au goût neutre pour les personnes atteintes d'hypoglycémie.",
    colors: "bg-light-fg-dark",
    primaryLinks: {
      title: "Produit",
      links: [
        { label: "Fonctionnalités", url: "#", __metadata: { modelName: "Link" } },
        { label: "Tarifs", url: "#", __metadata: { modelName: "Link" } },
        { label: "FAQ", url: "#", __metadata: { modelName: "Link" } },
      ],
    },
    secondaryLinks: {
      title: "Entreprise",
      links: [
        { label: "À propos", url: "#", __metadata: { modelName: "Link" } },
        { label: "Blog", url: "#", __metadata: { modelName: "Link" } },
        { label: "Contact", url: "#", __metadata: { modelName: "Link" } },
      ],
    },
    socialLinks: [
      { url: "#", icon: "facebook", altText: "Facebook" },
      { url: "#", icon: "instagram", altText: "Instagram" },
      { url: "#", icon: "linkedin", altText: "LinkedIn" },
    ],
    legalLinks: [
      { label: "Mentions légales", url: "#", __metadata: { modelName: "Link" } },
      { label: "Politique de confidentialité", url: "#", __metadata: { modelName: "Link" } },
    ],
    copyrightText: "© 2025 Hypocaps. Tous droits réservés.",
  },
};
