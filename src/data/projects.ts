export interface Episode {
  id: string;
  title: string;
  duration?: string;
  videoUrl?: string;
  thumbnail?: string;
  isPlaceholder?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  mainImage: string;
  gallery: string[];
  color: string;
  tags: string[];
  episodes?: Episode[];
}

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "NHÀ CÓ GIỖ",
    category: "Phim Ngắn / 3D Branding",
    year: "2026",
    description: "NHÀ CÓ GIỖ – Phim hoạt hình 3D ngắn chính thức ra mắt! Sau khoảng thời gian thực hiện và hoàn thiện, chúng tôi rất vui khi được mang bộ phim đến với mọi người trên YouTube và FanPage chính thức. 💛 Một câu chuyện vừa hài hước, gần gũi nhưng cũng đầy cảm xúc về gia đình, đám giỗ và những yêu thương đôi khi chưa kịp nói thành lời.",
    mainImage: "/images/input_file_1.png",
    gallery: [],
    color: "bg-studio-red",
    tags: ["3D Animation", "Creative Direction", "CGI", "Visual Storytelling"],
    episodes: [
      {
        id: "ep1",
        title: "Tập 1: Mâm cỗ ngày giỗ",
        duration: "10:24",
        videoUrl: "https://www.youtube.com/embed/TM142-7LiiQ?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/TM142-7LiiQ/maxresdefault.jpg",
      },
      {
        id: "ep2",
        title: "Tập 2: (Sắp ra mắt)",
        isPlaceholder: true,
      },
      {
        id: "ep3",
        title: "Tập 3: (Sắp ra mắt)",
        isPlaceholder: true,
      }
    ]
  }
];
