import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"


const page = () => {
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                My Sticky sidebar
            </StickyWrapper>
            <FeedWrapper>
                Feed
            </FeedWrapper>
        </div>
    )
}

export default page