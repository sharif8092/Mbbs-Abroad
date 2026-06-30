import fs from 'fs';
import https from 'https';
import http from 'http';

async function checkImages() {
  try {
    const res = await fetch('http://localhost:3000/api/universities');
    const universities = await res.json();
    
    let allGood = true;
    for (const uni of universities) {
      const imgUrl = uni.image;
      if (!imgUrl) continue;
      
      try {
        const imgRes = await fetch(imgUrl, {
          method: 'HEAD',
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (imgRes.ok) {
          console.log(`[OK] ${uni.name}: ${imgUrl}`);
        } else {
          console.log(`[FAILED] ${uni.name}: ${imgUrl} - Status: ${imgRes.status}`);
          allGood = false;
        }
      } catch (err) {
        console.log(`[ERROR] ${uni.name}: ${imgUrl} - ${err.message}`);
        allGood = false;
      }
    }
    
    if (allGood) {
      console.log('ALL IMAGES CHECKED OUT SUCCESSFULLY!');
    } else {
      console.log('SOME IMAGES FAILED!');
    }
  } catch (err) {
    console.error('Failed to fetch from local API:', err);
  }
}

checkImages();
