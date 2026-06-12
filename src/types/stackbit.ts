export interface SvgProps {
  className?: string;
  "data-sb-field-path"?: string;
}

export interface StackbitSelfStyles {
  flexDirection?: "row" | "row-reverse" | "col" | "col-reverse";
  alignItems?: string;
  justifyContent?: string;
  margin?: Record<string, number | string> | string[];
  padding?: Record<string, number | string> | string[];
  borderWidth?: number;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  [key: string]: unknown;
}

export interface StackbitStyles {
  self?: StackbitSelfStyles;
  subtitle?: Record<string, string>;
  text?: Record<string, string>;
}

export interface BackgroundImageProps {
  url?: string;
  altText?: string;
  className?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  opacity?: number;
}

export interface ActionProps {
  elementId?: string;
  className?: string;
  "data-sb-field-path"?: string;
  label?: string;
  altText?: string;
  url?: string;
  showIcon?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  style?: "primary" | "secondary";
  __metadata?: {
    modelName?: string;
  };
}

export interface BadgeProps {
  label?: string;
  color?: string;
  styles?: StackbitStyles;
  className?: string;
  "data-sb-field-path"?: string;
}

export interface TitleBlockProps {
  text?: string;
  color?: string;
  styles?: StackbitStyles;
  className?: string;
  "data-sb-field-path"?: string;
}

export interface ImageBlockProps {
  elementId?: string;
  className?: string;
  imageClassName?: string;
  url?: string;
  altText?: string;
  styles?: StackbitStyles;
  "data-sb-field-path"?: string;
}

export interface LinkProps {
  children: React.ReactNode;
  href?: string;
  [key: string]: unknown;
}

export interface SocialProps {
  elementId?: string;
  className?: string;
  "data-sb-field-path"?: string;
  altText?: string;
  url?: string;
  icon?: string;
}

export interface SectionProps {
  elementId?: string;
  className?: string;
  colors?: string;
  backgroundImage?: BackgroundImageProps;
  styles?: StackbitSelfStyles;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export interface VideoBlockProps {
  elementId?: string;
  className?: string;
  "data-sb-field-path"?: string;
  url?: string;
  aspectRatio?: "16:9" | "4:3";
  styles?: StackbitStyles;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  poster?: string;
}

export interface GenericSectionProps {
  elementId?: string;
  className?: string;
  colors?: string;
  backgroundImage?: BackgroundImageProps;
  badge?: any;
  title?: any;
  subtitle?: string;
  text?: string;
  actions?: ActionProps[];
  media?: any;
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface FooterProps {
  colors?: string;
  logo?: any;
  title?: any;
  text?: string;
  primaryLinks?: any[];
  secondaryLinks?: any[];
  socialLinks?: SocialProps[];
  legalLinks?: any[];
  copyrightText?: string;
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface HeaderProps {
  variant?: string;
  title?: any;
  logo?: any;
  primaryLinks?: any[];
  secondaryLinks?: any[];
  colors?: string;
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface PricingSectionProps {
  elementId?: string;
  className?: string;
  colors?: string;
  backgroundImage?: BackgroundImageProps;
  badge?: any;
  title?: any;
  subtitle?: string;
  text?: string;
  plans?: any[];
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface DividerSectionProps {
  elementId?: string;
  className?: string;
  colors?: string;
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface FormBlockProps {
  fields?: any[];
  elementId?: string;
  submitButton?: any;
  className?: string;
  styles?: StackbitStyles;
  "data-sb-field-path"?: string;
}

export interface FormControlProps {
  name?: string;
  label?: string;
  hideLabel?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  width?: "full" | "1/2";
  options?: string[];
  defaultValue?: string;
  className?: string;
  "data-sb-field-path"?: string;
  styles?: StackbitStyles;
  __metadata?: {
    modelName?: string;
  };
}

export interface SubmitButtonProps {
  elementId?: string;
  className?: string;
  "data-sb-field-path"?: string;
  label?: string;
  showIcon?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  style?: "primary" | "secondary";
  disabled?: boolean;
}

export interface CenterSectionProps extends GenericSectionProps {
  centerWidth?: string;
}

export interface FeaturedItemsSectionProps {
  elementId?: string;
  className?: string;
  colors?: string;
  backgroundImage?: BackgroundImageProps;
  badge?: any;
  title?: any;
  subtitle?: string;
  text?: string;
  items?: any[];
  actions?: ActionProps[];
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface FeaturedItemProps {
  elementId?: string;
  className?: string;
  "data-sb-field-path"?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  text?: string;
  image?: any;
  featured?: boolean;
  actions?: ActionProps[];
  colors?: string;
  styles?: StackbitStyles;
  hasSectionTitle?: boolean;
  [key: string]: unknown;
}

export interface PostFeedSectionProps {
  elementId?: string;
  className?: string;
  colors?: string;
  backgroundImage?: BackgroundImageProps;
  badge?: any;
  title?: any;
  subtitle?: string;
  text?: string;
  variant?: string;
  posts?: any[];
  showThumbnail?: boolean;
  showExcerpt?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  pageLinks?: any;
  searchBox?: any;
  hoverEffect?: string;
  annotatePosts?: boolean;
  actions?: ActionProps[];
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface CarouselSectionProps {
  elementId?: string;
  className?: string;
  colors?: string;
  backgroundImage?: BackgroundImageProps;
  badge?: any;
  title?: any;
  subtitle?: string;
  items?: any[];
  variant?: string;
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface ImageGallerySectionProps {
  elementId?: string;
  className?: string;
  colors?: string;
  backgroundImage?: BackgroundImageProps;
  badge?: any;
  title?: any;
  subtitle?: string;
  images?: any[];
  motion?: string;
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface FeaturedPeopleSectionProps {
  elementId?: string;
  className?: string;
  colors?: string;
  backgroundImage?: BackgroundImageProps;
  badge?: any;
  title?: any;
  subtitle?: string;
  actions?: ActionProps[];
  people?: any[];
  variant?: string;
  styles?: StackbitStyles;
  enableAnnotations?: boolean;
  [key: string]: unknown;
}

export interface FeaturedItemToggleProps {
  elementId?: string;
  className?: string;
  "data-sb-field-path"?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  actions?: ActionProps[];
  colors?: string;
  styles?: StackbitStyles;
  hasSectionTitle?: boolean;
  [key: string]: unknown;
}

export interface LayoutProps {
  page: any;
  site: any;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export interface PostFeedItemProps {
  className?: string;
  "data-sb-field-path"?: string;
  post: any;
  showThumbnail?: boolean;
  showExcerpt?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  hasSectionTitle?: boolean;
  hasBigThumbnail?: boolean;
  hoverEffect?: string;
  sectionColors?: string;
  hasAnnotations?: boolean;
  styles?: StackbitStyles;
  [key: string]: unknown;
}
