import LeaderPortrait from '@/components/common/leader-portrait'
import { leadershipDetails } from '@/constants/leadership-content'

function LeaderCard({ leader }) {
  return (
    <article className="group h-full min-w-0 rounded-[2rem] border border-cream/10 bg-cream/[0.025] p-3">
      <LeaderPortrait key={leader.imageSrc || 'no-portrait'} src={leader.imageSrc} alt={leader.imageAlt || `Portrait of ${leader.name}`} />
      <div className="px-3 pt-6 pb-5 sm:px-4">
        <p className="text-sm font-medium tracking-wide break-words text-gold">{leader.role || leadershipDetails.rolePending}</p>
        <h3 className="mt-2 text-2xl leading-tight font-semibold tracking-tight break-words text-cream">{leader.name}</h3>
        {leader.description ? <p className="mt-3 text-sm leading-relaxed break-words text-cream/70">{leader.description}</p> : null}
      </div>
    </article>
  )
}

export default LeaderCard
