import fs from 'fs';

let content = fs.readFileSync('src/data/universities.ts', 'utf-8');

const originalImages = {
  'Bukhara State Medical Institute': 'https://gmfadmission.in/wp-content/uploads/2022/08/Bukhara-State-Medical-Institute.jpg',
  'Tashkent State Medical University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tashkent_Medical_Academy_Main_Building.jpg/800px-Tashkent_Medical_Academy_Main_Building.jpg',
  'Samarkand State Medical University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Samarkand_State_Medical_Institute.jpg/800px-Samarkand_State_Medical_Institute.jpg',
  'Osh State University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Main_building_of_Osh_State_University.JPG/800px-Main_building_of_Osh_State_University.JPG',
  'Jalal-Abad State University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jalalabad_State_University_Main_Campus.jpg/800px-Jalalabad_State_University_Main_Campus.jpg',
  'Kyrgyz State Medical Academy (KSMA)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Kyrgyz_State_Medical_Academy_Bishkek.jpg/800px-Kyrgyz_State_Medical_Academy_Bishkek.jpg',
  'Kazakh National Medical University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/%D0%9A%D0%B0%D0%B7%D0%9D%D0%9C%D0%A3_%D0%B8%D0%BC._%D0%A1.%D0%94._%D0%90%D1%81%D1%84%D0%B5%D0%BD%D0%B4%D0%B8%D1%8F%D1%80%D0%BE%D0%B2%D0%B0.jpg/800px-%D0%9A%D0%B0%D0%B7%D0%9D%D0%9C%D0%A3_%D0%B8%D0%BC._%D0%A1.%D0%94._%D0%90%D1%81%D1%84%D0%B5%D0%BD%D0%B4%D0%B8%D1%8F%D1%80%D0%BE%D0%B2%D0%B0.jpg',
  'Kazan Federal University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Main_building_of_Kazan_State_University.jpg/800px-Main_building_of_Kazan_State_University.jpg',
  'Dhaka National Medical College': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dhaka_Medical_College_Hospital.JPG/800px-Dhaka_Medical_College_Hospital.JPG',
  'Tbilisi State Medical University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tbilisi_State_Medical_University.jpg/800px-Tbilisi_State_Medical_University.jpg',
  'Tribhuvan University - Institute of Medicine': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Tribhuvan_University_Central_Library_building.jpg/800px-Tribhuvan_University_Central_Library_building.jpg',
  'Hong Bang International University (HIU)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ship_of_Knowledge_-_Hong_Bang_International_University.jpg/800px-Ship_of_Knowledge_-_Hong_Bang_International_University.jpg',
  'Cairo University Faculty of Medicine': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Kaser_El-Aini_Hospital_Entrance.jpg/800px-Kaser_El-Aini_Hospital_Entrance.jpg',
  'University of Belgrade Faculty of Medicine': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Kapetan_Misa_building_by_night.jpg/800px-Kapetan_Misa_building_by_night.jpg',
  'University of Sarajevo Faculty of Medicine': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/University_of_Sarajevo_-_rectorate_building.jpg/800px-University_of_Sarajevo_-_rectorate_building.jpg',
  'Carol Davila University of Medicine and Pharmacy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Bucuresti_-_Facultatea_de_Medicina_%28Palatul_Facultatii_de_Medicina%29_-_Carol_Davila.jpg/800px-Bucuresti_-_Facultatea_de_Medicina_%28Palatul_Facultatii_de_Medicina%29_-_Carol_Davila.jpg',
  'Medical University Sofia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Medical_Faculty_Sofia.JPG/800px-Medical_Faculty_Sofia.JPG',
  'Tehran University of Medical Sciences': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tehran_University_of_Medical_Sciences_Entrance.jpg/800px-Tehran_University_of_Medical_Sciences_Entrance.jpg'
};

for (const [name, url] of Object.entries(originalImages)) {
  const nameEscaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const nameRegex = new RegExp(`(name:\\s*['"]${nameEscaped}['"][\\s\\S]*?image:\\s*['"])([^'"]+)(['"])`, 'g');
  content = content.replace(nameRegex, `$1${url}$3`);
}

fs.writeFileSync('src/data/universities.ts', content, 'utf-8');
console.log('Fixed ALL URLs');
