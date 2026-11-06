import Container from '@/components/common/container'
import DraftNote from '@/components/common/draft-note'
import Marquee from '@/components/common/marquee'
import PhotoStripImage from '@/components/common/photo-strip-image'
import SectionHeading from '@/components/common/section-heading'
import { photoStripContent, photoStripPhotos } from '@/data/photo-strip'
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion'

function PhotoStripSection({ photos = photoStripPhotos }) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="photo-strip" aria-labelledby="photo-strip-heading" className="overflow-hidden bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading id="photo-strip-heading" {...photoStripContent} />
        <DraftNote className="mt-7">{photoStripContent.placeholderNote}</DraftNote>
      </Container>
      {photos.length ? (
        <div id="homepage-photo-slider" className="mt-10 motion-reduce:mx-auto motion-reduce:max-w-7xl motion-reduce:px-5 sm:motion-reduce:px-8">
          <Marquee items={photos} duration={55} paused={reducedMotion} pauseOnHover={false} staticWhenReduced label={photoStripContent.listLabel} className="motion-reduce:mask-none" renderItem={(photo, { isCopy }) => <PhotoStripImage key={photo.src} photo={photo} isCopy={isCopy} />} />
        </div>
      ) : <Container><p role="status" className="mt-10 text-muted-foreground">{photoStripContent.empty}</p></Container>}
    </section>
  )
}

export default PhotoStripSection
