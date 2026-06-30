import fs from 'fs';

const collegeBuildingImages = [
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1598128558393-70ff21433be0?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1581362072978-14998d01fdaa?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1587560699334-bea53191d222?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1590073844006-33379778aece?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1580860578841-f703554e12e3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?auto=format&fit=crop&q=80&w=800'
];

async function updateToBuildings() {
  let content = fs.readFileSync('src/data/universities.ts', 'utf-8');
  let i = 0;
  
  // Replace main image
  content = content.replace(/image:\s*['"](.*?)['"]/g, (match, p1) => {
    const replacement = collegeBuildingImages[i % collegeBuildingImages.length];
    i++;
    return `image: '${replacement}'`;
  });
  
  // Replace gallery images
  content = content.replace(/gallery:\s*\[\s*['"](.*?)['"]\s*\]/g, (match, p1) => {
    const replacement = collegeBuildingImages[i % collegeBuildingImages.length];
    i++;
    return `gallery: [\n      '${replacement}'\n    ]`;
  });

  fs.writeFileSync('src/data/universities.ts', content, 'utf-8');
  console.log('Replaced all images with medical college buildings.');
}

updateToBuildings();
