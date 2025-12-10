const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.next') && !filePath.includes('dist')) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

function removePolishTranslations() {
  const files = getAllFiles(path.join(__dirname, 'src'));

  let totalFilesProcessed = 0;
  let totalLinesRemoved = 0;

  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      const originalContent = content;
      
      // Remove lines that contain "pl:" followed by any content
      // This regex matches the entire line including indentation
      content = content.replace(/^(\s*)pl:\s*.*,?\s*$/gm, '');
      
      // Clean up any double empty lines that might result
      content = content.replace(/\n\n\n+/g, '\n\n');
      
      // Clean up label/group objects that might now only have en: and zh:
      // Remove trailing commas before closing braces
      content = content.replace(/,(\s*)\n(\s*)}/g, '$1\n$2}');
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        const linesRemoved = (originalContent.match(/pl:/g) || []).length;
        totalLinesRemoved += linesRemoved;
        totalFilesProcessed++;
        console.log(`✓ Updated ${path.relative(process.cwd(), file)} (${linesRemoved} lines removed)`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n✅ Done! Processed ${totalFilesProcessed} files, removed ${totalLinesRemoved} Polish translation lines.`);
}

removePolishTranslations();
