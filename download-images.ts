import fs from 'fs';
import path from 'path';

const images = [
  { id: 'bukhara-state-medical-institute', url: 'https://gmfadmission.in/wp-content/uploads/2022/08/Bukhara-State-Medical-Institute.jpg' },
  { id: 'tashkent-state-medical-university', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Tashkent_Medical_Academy_Main_Building.jpg' },
  { id: 'samarkand-state-medical-university', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Samarkand_State_Medical_Institute.jpg' },
  { id: 'osh-state-university', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Main_building_of_Osh_State_University.JPG' },
  { id: 'jalal-abad-state-university', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jalalabad_State_University_Main_Campus.jpg/800px-Jalalabad_State_University_Main_Campus.jpg' },
  { id: 'kyrgyz-state-medical-academy', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Kyrgyz_State_Medical_Academy_Bishkek.jpg' },
  { id: 'kazakh-national-medical-university', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/%D0%9A%D0%B0%D0%B7%D0%9D%D0%9C%D0%A3_%D0%B8%D0%BC._%D0%A1.%D0%94._%D0%90%D1%81%D1%84%D0%B5%D0%BD%D0%B4%D0%B8%D1%8F%D1%80%D0%BE%D0%B2%D0%B0.jpg' },
  { id: 'kazan-federal-university', url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Main_building_of_Kazan_State_University.jpg' },
  { id: 'dhaka-national-medical-college', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Dhaka_Medical_College_Hospital.JPG' },
  { id: 'tbilisi-state-medical-university', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Tbilisi_State_Medical_University.jpg' },
  { id: 'tribhuvan-university-iom', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Tribhuvan_University_Central_Library_building.jpg' },
  { id: 'hong-bang-international-university', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ship_of_Knowledge_-_Hong_Bang_International_University.jpg' },
  { id: 'cairo-university-medicine', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Kaser_El-Aini_Hospital_Entrance.jpg' },
  { id: 'belgrade-university-medicine', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Kapetan_Misa_building_by_night.jpg' },
  { id: 'sarajevo-university-medicine', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/University_of_Sarajevo_-_rectorate_building.jpg' },
  { id: 'carol-davila-medicine', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Bucuresti_-_Facultatea_de_Medicina_%28Palatul_Facultatii_de_Medicina%29_-_Carol_Davila.jpg' },
  { id: 'sofia-medical-university', url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Medical_Faculty_Sofia.JPG' },
  { id: 'tehran-medical-university', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Tehran_University_of_Medical_Sciences_Entrance.jpg' }
];

async function download() {
  for (const img of images) {
    const ext = path.extname(new URL(img.url).pathname) || '.jpg';
    const filePath = path.join('public', 'universities', `${img.id}${ext}`);
    console.log(`Downloading ${img.id}...`);
    try {
      const response = await fetch(img.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));
        console.log(`Saved ${filePath}`);
      } else {
        console.log(`Failed ${img.id}: ${response.statusText}`);
      }
    } catch (e) {
      console.log(`Error ${img.id}: ${e.message}`);
    }
  }
}
download();
