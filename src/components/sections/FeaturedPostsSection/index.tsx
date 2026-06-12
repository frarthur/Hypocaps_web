import PostFeedSection from "../PostFeedSection";
import type { PostFeedSectionProps } from "../../../types/stackbit";
export default function FeaturedPostSection(props: PostFeedSectionProps) {
  return <PostFeedSection {...props} annotatePosts={true} />;
}
