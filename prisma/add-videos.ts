import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const newVideos = [
  { title: 'A Ram Sam Sam - Dance With Animals', videoUrl: '/videos/A_Ram_Sam_Sam_Dance_With_Animals_Newborn_Nursery_Rhymes_Kids_Songs.mp4', author: 'Newborn Nursery', avatar: 'N' },
  { title: 'Old Macdonalds Farm - Cocomelon', videoUrl: '/videos/All_these_animals_on_Old_Macdonald_s_farm_cocomelon_farm_oldmacdonaldhadafarm.mp4', author: 'Cocomelon', avatar: 'C' },
  { title: 'Baby Lala Sharing Food with Farm Animals', videoUrl: '/videos/Baby_Lala_is_sharing_his_food_with_Farm_Animals_Good_Manners_for_kids.mp4', author: 'Baby Lala', avatar: 'B' },
  { title: 'Bike Safety Rules - BebeFinn', videoUrl: '/videos/Bike_Safety_Rules_to_Keep_in_Mind_bebefinn_shorts_kidssong.mp4', author: 'BebeFinn', avatar: 'B' },
  { title: 'Cars Changing Colors - Learn Colors', videoUrl: '/videos/Cars_are_Changing_Colors_Learn_Colors_with_Cars_Cars_Driving_on_the_Xylophone_shorts.mp4', author: 'Color Cars', avatar: 'C' },
  { title: 'Clap Your Hands - LooLoo Kids', videoUrl: '/videos/Clap_Your_Hands_Shorts_If_Youre_Happy_Song_-_LooLoo_Kids.mp4', author: 'LooLoo Kids', avatar: 'L' },
  { title: 'Gấu Trúc Panda Dễ Thương', videoUrl: '/videos/G_u_tr_c_Panda._P3_tiktok_funny_shorts_reels.mp4', author: 'Panda World', avatar: 'P' },
  { title: 'Great Rescue Team - Tayo Bus', videoUrl: '/videos/Great_Rescue_Team_Please_Help_us_Shorts_TayotheLittleBus_tayosongs.mp4', author: 'Tayo Bus', avatar: 'T' },
  { title: 'Guess 5 Animal Sounds Quiz', videoUrl: '/videos/Guess_These_5_Animal_Sounds_shorts_animals_quiz.mp4', author: 'Animal Quiz', avatar: 'A' },
  { title: 'Learn to Count 1-10 Brush Teeth', videoUrl: '/videos/Learn_to_Count_1-10_with_Brush_Your_Teeth_Kids_Learn_Counting_Numbers_Kids_Songs_shorts.mp4', author: 'Kids Learn', avatar: 'K' },
  { title: 'Mengenang Halloween Tahun Lalu', videoUrl: '/videos/Mengenang_Halloween_Tahun_Lalu.mp4', author: 'Halloween Fun', avatar: 'H' },
  { title: 'Sea Animal Names - Rock Pool', videoUrl: '/videos/Sea_Animal_Names_for_Kids_to_Learn_at_the_Rock_Pool_Crab_Sea_Lion_Pufferfish_Walrus_Shark.mp4', author: 'Sea Animals', avatar: 'S' },
  { title: 'Wheels on the Bus - Korean', videoUrl: '/videos/_shorts_kids.mp4', author: 'Pororo Kids', avatar: 'P' },
];

async function main() {
  let added = 0;
  for (const v of newVideos) {
    // Check nếu video đã tồn tại (theo videoUrl) thì skip
    const exists = await prisma.video.findFirst({ where: { videoUrl: v.videoUrl } });
    if (exists) {
      console.log(`⏭️  Đã có: ${v.title}`);
      continue;
    }
    await prisma.video.create({
      data: {
        title: v.title,
        videoUrl: v.videoUrl,
        thumbnail: `https://i.ytimg.com/vi/default/hqdefault.jpg`,
        views: `${Math.floor(Math.random() * 5000)}`,
        authorName: v.author,
        authorAvatar: v.avatar,
        likes: Math.floor(Math.random() * 200),
      }
    });
    console.log(`✅ Thêm: ${v.title}`);
    added++;
  }
  const total = await prisma.video.count();
  console.log(`\n🎉 Đã thêm ${added} video mới. Tổng cộng: ${total} video.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
