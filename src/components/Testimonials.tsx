import { Star } from 'lucide-react';
import { testimonialsData, testimonialsNote } from '../data/testimonialsData';

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAFAFA] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#EA580C] mb-2">
              Community Feedback
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141416] tracking-tight [text-wrap:balance]">
              What Karachi Burger Lovers Say
            </h2>
          </div>
          <p className="text-xs text-zinc-500 max-w-sm">
            {testimonialsNote}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialsData.map((review) => (
            <article
              key={review.id}
              className="bg-white rounded-xl border border-zinc-200 p-6 flex flex-col justify-between gap-5"
            >
              <div>
                {/* Star Rating */}
                <div
                  className="flex items-center gap-1 mb-3"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 rounded-full bg-[#141416] text-white font-display text-sm font-semibold flex items-center justify-center shrink-0"
                  >
                    {review.initials}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-[#141416]">
                      {review.customerName}
                    </h3>
                    <p className="text-xs text-zinc-500">{review.neighborhood}</p>
                  </div>
                </div>

                <span className="text-xs font-medium text-zinc-500 text-right">
                  {review.orderedItem}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
