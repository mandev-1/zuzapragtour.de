import * as React from 'react';

export interface ReviewCardProps {
  /** The testimonial text (rendered in quotes). */
  quote: string;
  /** Guest name — its first letter seeds the avatar. */
  author: string;
  /** Source/platform line, e.g. 'TripAdvisor'. */
  source?: string;
}

/** Guest testimonial card with avatar initial and source line. */
export function ReviewCard(props: ReviewCardProps): JSX.Element;
export default ReviewCard;
