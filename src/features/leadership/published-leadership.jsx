import LeadershipSection from '@/components/sections/leadership-section'
import { usePublishedLeaders } from './use-published-leaders'

export default function PublishedLeadership(props) {
  const { status, leaders, reload } = usePublishedLeaders()
  return <LeadershipSection {...props} leaders={leaders} status={status} onRetry={reload} showDraftNote={false} />
}
