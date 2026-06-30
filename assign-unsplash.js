import fs from 'fs';
import https from 'https';

const goodImages = [
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1612349317150-e410f624c427?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1527613426401-41c9eff9257d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
];

async function verifyAndReplace() {
  const workingImages = [];
  
  for (const imgUrl of goodImages) {
    try {
      const imgRes = await fetch(imgUrl, { method: 'HEAD' });
      if (imgRes.ok) {
        workingImages.push(imgUrl);
      }
    } catch (e) { }
  }
  
  console.log(`Found ${workingImages.length} working images!`);
  
  let content = fs.readFileSync('src/data/universities.ts', 'utf-8');
  let i = 0;
  
  // Replace any image URL with a working image
  content = content.replace(/image:\s*['"](.*?)['"]/g, (match, p1) => {
    const replacement = workingImages[i % workingImages.length];
    i++;
    return `image: '${replacement}'`;
  });
  
  // Replace gallery images too
  content = content.replace(/gallery:\s*\[\s*['"](.*?)['"]\s*\]/g, (match, p1) => {
    const replacement = workingImages[i % workingImages.length];
    i++;
    return `gallery: [\n      '${replacement}'\n    ]`;
  });

  fs.writeFileSync('src/data/universities.ts', content, 'utf-8');
  console.log('Replaced all image URLs with guaranteed working medical campus images.');
}

verifyAndReplace();
