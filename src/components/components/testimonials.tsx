import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './testimonials.css';

// const mockBlogData: Blog[] = [
//   {
//     thumbnail: 'https://via.placeholder.com/240x150',
//     name: 'Blog Post 1',
//     by: 'Author 1',
//     desc: 'This is a description of the first blog post.',
//   },
//   {
//     thumbnail: 'https://via.placeholder.com/240x150',
//     name: 'Blog Post 2',
//     by: 'Author 2',
//     desc: 'This is a description of the second blog post.',
//   },
//   {
//     thumbnail: 'https://via.placeholder.com/240x150',
//     name: 'Blog Post 3',
//     by: 'Author 3',
//     desc: 'This is a description of the third blog post.',
//   },
//   {
//     thumbnail: 'https://via.placeholder.com/240x150',
//     name: 'Blog Post 4',
//     by: 'Author 4',
//     desc: 'This is a description of the fourth blog post.',
//   },
// ];

// Import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';

// Define the type for a blog object
interface Blog {
  thumbnail: string;
  name: string;
  by: string;
  desc: string;
}

export const Testimonials: React.FC = () => {
  const [Blogs, setBlogs] = useState<Blog[]>([]); // Type the state as an array of Blog

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const blogDataArray: Blog[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as Blog[]; // Cast the result to Blog[]

        console.log('All Doctors/patient data:', blogDataArray);

        setBlogs(blogDataArray);
      } catch (error) {
        console.error('Error fetching account type:', (error as Error).message); // Type assertion for error
      }
    })();
  }, []);

  return (
    <div className="text-white w-[80%] mx-auto">
      <div className="my-[50px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {Blogs.map((blog, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-3 bg-[#161D29] p-3 text-[17px] text-richblack-25 rounded-lg items-center">
                <div className="gap-4 flex flex-col items-center">
                  <img
                    src={blog?.thumbnail}
                    alt={blog?.name}
                    className="h-[150px] w-[240px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <h1 className="font-semibold text-richblack-5">
                      {blog?.name}
                    </h1>
                    <h2 className="text-[15px] font-medium text-richblack-500">
                      by: {blog?.by}
                    </h2>
                  </div>
                </div>
                <p className="font-medium text-richblack-25">{blog?.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

// export default Testimonials;
