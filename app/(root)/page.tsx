import StartupCard from '@/components/StartupCard';
import SearchForm from '../../components/SearchForm';

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: 'ElvireDev' },
      _id: 1,
      description: "this is a description",
      image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvYm90c3xlbnwwfHwwfHx8MA%3D%3D",
      category: "Robots",
      title: "We Robots",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className='pink_container'>
        <h1 className="heading">Pitch your startup, <br /> Connect with entrepreneurs</h1>

        <p className='sub-heading !max-w-3xl'>Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>

        <SearchForm query={query} />
      </section>

      {/* Startups Section */}
      <section className="section_container">
        <p className='text-30-semibold'>
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
              <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
