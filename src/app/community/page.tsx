import CommunityList from '@/components/community/CommunityList';
import { getPosts } from '@/utils/supabase/posts';

// import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const Communitypage = async () => {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['posts'],
  //   queryFn: () => getPosts()
  // });

  const posts = await getPosts();

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    //     </HydrationBoundary>
    <div className="w-full mx-auto">
      <section className="flex flex-col">
        <h1>자유 게시판</h1>
        <hr />
        <CommunityList posts={posts} />
      </section>
      <button>글 작성</button>
    </div>
  );
};

export default Communitypage;
