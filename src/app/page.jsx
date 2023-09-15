import HeroBanner from './home/Herobanner'
import Popular from './home/Popular'
import Trending from './home/Trending'
import TopRated from './home/TopRated'


export default function Home({children}) {
  return (
    <main>
      <div className='w-full'>
        <HeroBanner/>
        <Trending/>
        <Popular/>
        <TopRated/>
      </div>
    </main>
  )
}
