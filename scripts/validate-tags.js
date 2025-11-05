const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'posts');

// Função para verificar se uma string contém acentos ou caracteres especiais
function hasAccents(str) {
  return /[áàâãäéèêëíìîïóòôõöúùûüçñ]/i.test(str);
}

// Função para validar tags
function validateTags() {
  const fileNames = fs.readdirSync(postsDirectory);
  const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

  let hasErrors = false;
  const errors = [];

  mdFiles.forEach(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    if (matterResult.data.tags && Array.isArray(matterResult.data.tags)) {
      matterResult.data.tags.forEach(tag => {
        if (hasAccents(tag)) {
          hasErrors = true;
          errors.push({
            file: fileName,
            tag: tag,
            message: `Tag "${tag}" contém acentos ou caracteres especiais`
          });
        }
      });
    }
  });

  if (hasErrors) {
    console.error('\n❌ Erro: Tags com acentos ou caracteres especiais encontradas:\n');
    errors.forEach(error => {
      console.error(`  📄 ${error.file}`);
      console.error(`     Tag inválida: "${error.tag}"`);
      console.error(`     ${error.message}\n`);
    });
    console.error('💡 Dica: Use apenas letras sem acentos, números e hífens nas tags.');
    console.error('   Exemplos válidos: "carreira", "javascript", "engenharia-software"\n');
    process.exit(1);
  }

  console.log('✅ Todas as tags estão válidas (sem acentos ou caracteres especiais)');
}

validateTags();
